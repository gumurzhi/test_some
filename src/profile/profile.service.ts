import { Profile, profileModel } from './models/profile.model';
import { Attributes, FindOptions } from 'sequelize/types/model';
import { ModelStatic, Transaction } from 'sequelize';

export class ProfileService {
  private repository: ModelStatic<Profile>;
  private readonly instance: ProfileService;
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
    this.repository = profileModel as ModelStatic<Profile>;
  }

  public findOne(options?: FindOptions<Attributes<Profile>>) {
    return this.repository.findOne(options);
  }

  public async getById(userId: number, t?: Transaction) {
    const user = await this.repository.findOne({ where: { id: userId }, transaction: t });
    if (!user) {
      throw new Error(`There is no user with id ${userId}`);
    }
    return user;
  }
}
