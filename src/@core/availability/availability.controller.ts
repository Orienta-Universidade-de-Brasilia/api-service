import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {}
