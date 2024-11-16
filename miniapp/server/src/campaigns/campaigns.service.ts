import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  create(campaignData): Promise<Campaign> {
    const campaign = this.campaignsRepository.create(campaignData);
    return this.campaignsRepository.save(campaign);
  }

  update(id: number, data): Promise<any> {
    return this.campaignsRepository.update(id, data);
  }

  findById(id: number): Promise<Campaign> {
    return this.campaignsRepository.findOne(id);
  }
}