import { Profile, profileModel } from '../profile/models/profile.model';
import { BadRequestError } from '../common/errors/bad-request.error';
import { JobService } from '../job/job.service';
import { dbClient } from '../config/db.config';
import { ProfileService } from '../profile/profile.service';
import { ModelStatic } from 'sequelize';

export class ClientService {
  private readonly repository: ModelStatic<Profile>;
  private readonly jobService: JobService;
  private profileService: ProfileService;
  private readonly instance: ClientService;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
    this.repository = profileModel as ModelStatic<Profile>;
    this.jobService = new JobService();
    this.profileService = new ProfileService();
  }
  getClients() {
    return undefined;
  }

  public async depositMoney(user: Profile, recipientId: number, amount: number) {
    if (user.balance < amount) {
      throw new BadRequestError(`Not enough money`);
    }
    const t = await dbClient.transaction();
    try {
      const debtTotal = await this.jobService.getTotalUserDebt(user.id, t);
      if (amount > debtTotal / 4) {
        throw new BadRequestError(`Not enough money to pay`);
      }
      const recipient = await this.profileService.getById(recipientId);
      recipient.balance += amount;
      user.balance -= amount;
      await recipient.save({ transaction: t });
      await user.save({ transaction: t });
      await t.commit();
      return recipient.balance;
    } catch (error) {
      console.error(`Got error on depositMoney: ${error.message}`);
      await t.rollback();
      throw error;
    }
  }

  public async getBestClients(startDate: Date, endDate: Date, limit = 2): Promise<Profile[]> {
    const res = (
      await dbClient.query(`
        select
    p.*
    FROM
    Profiles p
    inner join (
        select
    c.ClientId as clientId,
        SUM(j.total) as total
    FROM
    Contracts c
    inner join (
        select
    j.ContractId,
        SUM(j.price) as total
    from
    Jobs j
    where
    j.paid = 1 and j.createdAt BETWEEN '${startDate.toISOString()}' and '${endDate.toISOString()}'
    group by
    j.ContractId ) as j
    ON
    (j.ContractId = c.id)
    group by c.ClientId
    order by
    j.total DESC
  ) as c
    ON
    (c."clientId" = p.id)
    LIMIT ${limit};
    `)
    )[0] as Profile[];
    return res;
  }
}
