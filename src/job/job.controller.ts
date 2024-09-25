import { JobService } from './job.service';
import { Profile } from '../profile/models/profile.model';

export class JobController {
  private service: JobService;
  constructor() {
    this.service = new JobService();
  }
  public getUnpaidJobs(user: Profile) {
    return this.service.getUnpaidJobs(user);
  }

  public payForJob(user: Profile, params: Record<string, string>) {
    return this.service.payForJob(user, +params.job_id);
  }
}
