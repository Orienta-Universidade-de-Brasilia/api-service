import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Campus Information')
@Controller('campus-information')
export class CampusInformationController {}
