import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../../schemas/client.schema';
import { CreateClientDto } from '../../dto/client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private ClientModel: Model<ClientDocument>) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.ClientModel(createClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.ClientModel.find().exec();
  }
}
