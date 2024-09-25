import * as Sequelize from 'sequelize';
import { dbClient } from '../../config/db.config';
import { CONTRACT_STATUS } from '../constants';
import { Job } from '../../job/models/job.model';
import { Profile } from '../../profile/models/profile.model';

export class Contract extends Sequelize.Model {
  id: number;
  terms: string;
  status: CONTRACT_STATUS;
  ClientId: number;
  ContractorId: number;
  Contractor: Profile;
  Client: Profile;
}
Contract.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    terms: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM(CONTRACT_STATUS.NEW, CONTRACT_STATUS.IN_PROGRESS, CONTRACT_STATUS.TERMINATED)
    },
    ClientId: {
      type: Sequelize.INTEGER
    },
    ContractorId: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize: dbClient,
    modelName: 'Contract'
  }
);

Contract.belongsTo(Profile, { as: 'Contractor' });
Contract.belongsTo(Profile, { as: 'Client' });
Job.belongsTo(Contract);
Contract.hasMany(Job);
Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
export const contractModel = dbClient.models.Contract;
