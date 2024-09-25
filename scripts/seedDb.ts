
/* WARNING THIS WILL DROP THE CURRENT DATABASE */

import {profileModel} from "../src/profile/models/profile.model";
import {contractModel} from "../src/contract/models/contract.model";
import {jobModel} from "../src/job/models/job.model";

(async function seed() {
  // create tables
  await jobModel.sync({ force: true });
  await contractModel.sync({ force: true });
  await profileModel.sync({ force: true });

  //insert data
  await Promise.all([
   profileModel.create({
      id: 1,
      firstName: 'Harry',
      lastName: 'Potter',
      profession: 'Wizard',
      balance: 1150,
      type:'client'
    }),
    profileModel.create({
      id: 2,
      firstName: 'Mr',
      lastName: 'Robot',
      profession: 'Hacker',
      balance: 231.11,
      type:'client'
    }),
    profileModel.create({
      id: 3,
      firstName: 'John',
      lastName: 'Snow',
      profession: 'Knows nothing',
      balance: 451.3,
      type:'client'
    }),
    profileModel.create({
      id: 4,
      firstName: 'Ash',
      lastName: 'Kethcum',
      profession: 'Pokemon master',
      balance: 1.3,
      type:'client'
    }),
    profileModel.create({
      id: 5,
      firstName: 'John',
      lastName: 'Lenon',
      profession: 'Musician',
      balance: 64,
      type:'admin'
    }),
    profileModel.create({
      id: 6,
      firstName: 'Linus',
      lastName: 'Torvalds',
      profession: 'Programmer',
      balance: 1214,
      type:'admin'
    }),
    profileModel.create({
      id: 7,
      firstName: 'Alan',
      lastName: 'Turing',
      profession: 'Programmer',
      balance: 22,
      type:'admin'
    }),
    profileModel.create({
      id: 8,
      firstName: 'Aragorn',
      lastName: 'II Elessar Telcontarvalds',
      profession: 'Fighter',
      balance: 314,
      type:'admin'
    }),
    contractModel.create({
      id:1,
      terms: 'bla bla bla',
     status: 'terminated',
      ClientId: 1,
      ContractorId:5
    }),
    contractModel.create({
      id:2,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 1,
      ContractorId: 6
    }),
    contractModel.create({
      id:3,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 6
    }),
    contractModel.create({
      id: 4,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 7
    }),
    contractModel.create({
      id:5,
      terms: 'bla bla bla',
      status: 'new',
      ClientId: 3,
      ContractorId: 8
    }),
    contractModel.create({
      id:6,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 3,
      ContractorId: 7
    }),
    contractModel.create({
      id:7,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 7
    }),
    contractModel.create({
      id:8,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 6
    }),
    contractModel.create({
      id:9,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 8
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      ContractId: 1,
    }),
    jobModel.create({
      description: 'work',
      price: 201,
      ContractId: 2,
    }),
    jobModel.create({
      description: 'work',
      price: 202,
      ContractId: 3,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      ContractId: 4,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      ContractId: 7,
    }),
    jobModel.create({
      description: 'work',
      price: 2020,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 7,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-16T19:11:26.737Z',
      ContractId: 3,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      ContractId: 1,
    }),
    jobModel.create({
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      ContractId: 5,
    }),
    jobModel.create({
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-10T19:11:26.737Z',
      ContractId: 1,
    }),
    jobModel.create({
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    jobModel.create({
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      ContractId: 3,
    }),
    jobModel.create({
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-14T23:11:26.737Z',
      ContractId: 3,
    }),
    
  ]);
})().catch(err => {
  console.log(err);
})
