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

  create(campaignData: Partial<Campaign>): Promise<Campaign> {
    const campaign = this.campaignsRepository.create(campaignData);
    return this.campaignsRepository.save(campaign);
  }
  async update(id: number, data: Partial<Campaign>): Promise<Campaign> {
    await this.campaignsRepository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    return campaign;
  }
}