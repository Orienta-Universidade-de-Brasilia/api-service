import { Public } from '@common/decorators/auth.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller()
export class HealthCheckController {
  @Get('health-check')
  @Public()
  getHealthCheck(): string {
    return 'ok';
  }
}
