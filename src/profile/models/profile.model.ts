import Sequelize from 'sequelize';
import { dbClient } from '../../config/db.config';

export class Profile extends Sequelize.Model {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: string;
}
Profile.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2)
    },
    type: {
      type: Sequelize.ENUM('client', 'admin')
    }
  },
  {
    sequelize: dbClient,
    modelName: 'Profile'
  }
);

export const profileModel = dbClient.models.Profile;
