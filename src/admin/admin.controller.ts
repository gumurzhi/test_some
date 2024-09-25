import { AdminService } from './admin.service';
import { Profile } from '../profile/models/profile.model';
import { GetBetsClientsParamsDto } from './dto/get-bets-clients-params.dto';
import { GetBestProfessionParamsDto } from './dto/get-best-profession-params.dto';

export class AdminController {
  private readonly service: AdminService;
  constructor() {
    this.service = new AdminService();
  }

  public bestProfession(user: Profile, params: GetBestProfessionParamsDto) {
    return this.service.getBestProfession(params);
  }

  public bestClients(user: Profile, params: GetBetsClientsParamsDto) {
    return this.service.getBestClients(params);
  }
}
