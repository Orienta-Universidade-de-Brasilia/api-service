import { Module } from '@nestjs/common';
import { CampusInformationController } from './campusInformation.controller';
import { CampusInformationService } from './campusInformation.service';

@Module({
  imports: [],
  controllers: [CampusInformationController],
  providers: [CampusInformationService],
  exports: [CampusInformationService],
})
export class CampusInformationModule {}
