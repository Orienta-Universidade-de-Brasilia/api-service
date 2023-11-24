import { RecommendationSystemService } from './rs.service';
import { Module } from '@nestjs/common';
import { RecommendationSystemController } from './rs.controller';

@Module({
  imports: [],
  controllers: [RecommendationSystemController],
  providers: [RecommendationSystemService],
  exports: [RecommendationSystemService],
})
export class RecommendationSystemModule {}
