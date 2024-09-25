import { ClientService } from './client.service';
import { Profile } from '../profile/models/profile.model';
import { DepositMoneyPayloadDto } from './dto/input/deposit-money-payload.dto';

export class ClientController {
  private service: ClientService;
  constructor() {
    this.service = new ClientService();
  }

  public depositMoney(user: Profile, params: Record<string, string>, body: DepositMoneyPayloadDto) {
    return this.service.depositMoney(user, +params.userId, body.amount);
  }
}
