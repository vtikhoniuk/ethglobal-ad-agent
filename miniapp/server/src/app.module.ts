import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CampaignsModule } from './campaigns/campaigns.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './campaigns/campaign.entity';
import { AuthMiddleware } from './auth/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Campaign],
      synchronize: true,
    }),
    CampaignsModule,
    HttpModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/campaigns');
  }
}