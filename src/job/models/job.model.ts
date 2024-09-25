import * as Sequelize from 'sequelize';
import { dbClient } from '../../config/db.config';
import { Contract } from '../../contract/models/contract.model';

export class Job extends Sequelize.Model {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date;
  ContractId: number;
  Contract: Contract;
}
Job.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
    paid: {
      type: Sequelize.BOOLEAN
    },
    paymentDate: {
      type: Sequelize.DATE
    },
    ContractId: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize: dbClient,
    modelName: 'Job',
    timestamps: true,
    updatedAt: 'paymentDate'
  }
);

export const jobModel = dbClient.models.Job;
