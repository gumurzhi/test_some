import { NotFountError } from '../common/errors/not-fount.error';
import { ModelStatic, Op } from 'sequelize';
import { Contract, contractModel } from './models/contract.model';
import { Profile } from '../profile/models/profile.model';
import { CONTRACT_STATUS } from './constants';

export class ContractService {
  private repository: ModelStatic<Contract>;
  constructor() {
    this.repository = contractModel as ModelStatic<Contract>;
  }
  public async getById(id: number, user: Profile) {
    const contract = await this.repository.findOne({
      where: { id, [Op.or]: [{ ContractorId: user.id }, { ClientId: user.id }] }
    });
    if (!contract) {
      throw new NotFountError(`Contract ${id} not found`);
    }
    return contract;
  }

  public async getContractList(user: Profile) {
    const contracts = await this.repository.findAll({
      where: { [Op.or]: [{ ClientId: user.id }, { ContractorId: user.id }], [Op.not]: { status: CONTRACT_STATUS.TERMINATED } }
    });
    return contracts;
  }
}
