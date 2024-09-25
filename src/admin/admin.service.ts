import { Profile, profileModel } from '../profile/models/profile.model';
import { GetBetsClientsParamsDto } from './dto/get-bets-clients-params.dto';
import { GetBestProfessionParamsDto } from './dto/get-best-profession-params.dto';
import { JobService } from '../job/job.service';
import { ClientService } from '../client/client.service';
import { ModelStatic } from 'sequelize';

export class AdminService {
  private readonly repository: ModelStatic<Profile>;
  private jobService: JobService;
  private clientService: ClientService;
  constructor() {
    this.repository = profileModel as ModelStatic<Profile>;
    this.jobService = new JobService();
    this.clientService = new ClientService();
  }
  public async getBestProfession(params: GetBestProfessionParamsDto) {
    return this.jobService.getBestProfession(new Date(params.start), new Date(params.end));
  }

  public async getBestClients(params: GetBetsClientsParamsDto) {
    return this.clientService.getBestClients(new Date(params.start), new Date(params.end), params.limit);
  }
}
