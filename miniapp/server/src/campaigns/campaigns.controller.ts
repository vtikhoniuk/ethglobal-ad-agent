import {
    Controller,
    Post,
    UseInterceptors,
    Body,
    Req,
    Res,
    HttpStatus,
  } from '@nestjs/common';
  import { AnyFilesInterceptor } from '@nestjs/platform-express';
  import { CampaignsService } from './campaigns.service';
  import { Request, Response } from 'express';
  import { HttpService } from '@nestjs/axios';
  import { Campaign } from './campaign.entity';
  import { lastValueFrom } from 'rxjs';
  
  export class CreateCampaignDto {
    campaignName: string | undefined;
    websiteLink: string | undefined;
    description: string | undefined;
    documents?: string[];
  }
  export interface CustomRequest extends Request {
    user: {
      id: string;
      email: string;
    };
  }

  @Controller('api/campaigns')
  export class CampaignsController {
    constructor(
      private campaignsService: CampaignsService,
      private httpService: HttpService,
    ) {}
    

    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    async createCampaign(
      // @UploadedFiles() files: Express.Multer.File[],
      @Body() body: CreateCampaignDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      try {
        // const fileNames = files ? files.map((file) => file.originalname) : [];
        const campaignData = {
          campaignName: body.campaignName,
          websiteLink: body.websiteLink,
          description: body.description,
          // documents: fileNames,
          userId: (req as CustomRequest).user.id,
        };
        const campaign = await this.campaignsService.create(campaignData);

        // Send data to processing application
        const processingResponse = await lastValueFrom(
          this.httpService.post(
            process.env.PROCESSING_APP_URL || '',
            campaign,
          ),
        );
        // Update campaign with generated data
        await this.campaignsService.update(campaign.id, {
          generatedText: processingResponse.data.text,
          estimatedReach: processingResponse.data.estimatedReach,
        });
  
        // Return the updated campaign
        const updatedCampaign = await this.campaignsService.findById(campaign.id);
        return res.status(HttpStatus.OK).json(updatedCampaign);
      } catch (error) {
        console.error('Error in createCampaign:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An error occurred while creating the campaign.',
        });
      }
    }
  
    @Post('pay')
    async initiatePayment(@Body() body: { campaignId: string; amount: number }, @Req() req: Request & { user: { id: string } }, @Res() res: Response) {
      const { campaignId, amount } = body;
      try {
        const campaign = await this.campaignsService.findById(Number(campaignId));
        if (!campaign || campaign.userId !== req.user.id) {
          return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied.' });
        }

        // Simulate payment initiation via Circle API
        // Replace with actual API call to Circle
        const paymentResponse = {
          status: 'pending',
          paymentId: 'payment_id',
        };
  
        // Return payment response
        return res.status(HttpStatus.OK).json(paymentResponse);
      } catch (error) {
        console.error('Error in initiatePayment:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An error occurred while initiating payment.',
        });
      }
    }
  }