import { Job, jobModel } from './models/job.model';
import { col, fn, ModelStatic, Op, Transaction } from 'sequelize';
import { Profile } from '../profile/models/profile.model';
import { Contract } from '../contract/models/contract.model';
import { CONTRACT_STATUS } from '../contract/constants';
import { NotFountError } from '../common/errors/not-fount.error';
import { dbClient } from '../config/db.config';
import { ProfileService } from '../profile/profile.service';
import { BadRequestError } from '../common/errors/bad-request.error';

export class JobService {
  private readonly repository: ModelStatic<Job>;
  private readonly instance: JobService;
  private profileService: ProfileService;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
    this.repository = jobModel as ModelStatic<Job>;
    this.profileService = new ProfileService();
  }

  private getContractSubquery(userId: number) {
    return {
      model: Contract,
      where: {
        [Op.and]: [{ [Op.or]: [{ clientId: userId }, { contractorId: userId }] }, { status: CONTRACT_STATUS.IN_PROGRESS }]
      }
    };
  }

  async getUnpaidJobs(user: Profile) {
    const jobs = await this.repository.findAll({
      where: { paid: { [Op.not]: true } },
      include: [this.getContractSubquery(user.id)],
      attributes: ['id', 'description', 'price', 'paid', 'paymentDate', 'contractId']
    });
    return jobs;
  }

  public async getUnpaidJobById(user: Profile, jobId: number, t?: Transaction) {
    const job = (
      await this.repository.findAll({
        where: { paid: { [Op.not]: true }, id: jobId },
        include: [this.getContractSubquery(user.id)],
        transaction: t
      })
    )[0];
    if (!job) {
      throw new NotFountError(`There is no unpaid job with id ${jobId}`);
    }
    return job;
  }

  public async payForJob(user: Profile, jobId: number) {
    const t = await dbClient.transaction();
    try {
      const job = await this.getUnpaidJobById(user, jobId, t);
      const client = await this.profileService.getById(job.Contract.ClientId);
      const contractor = await this.profileService.getById(job.Contract.ContractorId);
      if (client.balance < job.price) {
        throw new BadRequestError(`Not enough money`);
      }
      client.balance -= job.price;
      contractor.balance += job.price;
      job.paid = true;
      await Promise.all([job.save({ transaction: t }), client.save({ transaction: t }), contractor.save({ transaction: t })]);
      await t.commit();
      return job;
    } catch (error) {
      console.error(`Got error on payForJob: ${error.message}`);
      await t.rollback();
      throw error;
    }
  }

  public async getTotalUserDebt(userId: number, t?: Transaction): Promise<number> {
    const sumResult = await this.repository.findAll({
      attributes: [[fn('SUM', col('price')), 'price']],
      include: [
        {
          model: Contract,
          where: {
            status: { [Op.not]: 'terminated' },
            ContractorId: userId
          },
          required: true
        }
      ],
      where: {
        paid: { [Op.not]: true }
      },
      transaction: t
    });
    return (sumResult[0].get('price') || 0) as number;
  }

  public async getBestProfession(startDate: Date, endDate: Date): Promise<string> {
    const rowResul = (
      await dbClient.query(`select j.ContractId as contractId, SUM(j.price) as total, p.profession from Jobs j 
              inner join Contracts c ON (contractId = c.id)
              inner join Profiles p ON (p.id = c.ContractorId)
              where j.paid = 1 and j.createdAt BETWEEN '${startDate.toISOString()}' and '${endDate.toISOString()}'
              group by j.ContractId
              order by total DESC 
              LIMIT 1`)
    )[0][0] as { contractId: number; total: number; profession: string };
    const { profession = '' } = rowResul || {};
    return profession;
  }
}
