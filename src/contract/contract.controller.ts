import { ContractService } from './contract.service';
import { Profile } from '../profile/models/profile.model';

export class ContractController {
  private service: ContractService;
  constructor() {
    this.service = new ContractService();
  }

  public async getById(profile: Profile, params: Record<string, string>) {
    const contract = await this.service.getById(+params.id, profile);
    return contract;
  }

  public async getContractList(user: Profile) {
    const contracts = await this.service.getContractList(user);
    return contracts;
  }
}
