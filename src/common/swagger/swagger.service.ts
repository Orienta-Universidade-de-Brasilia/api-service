import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@config/configuration.config';

@Injectable()
export class SwaggerService {
  private configService: ConfigService;
  constructor() {
    this.configService = new ConfigService();
  }
  init(app) {
    if (!this.configService.get('server').isEnabled) return;
    const config = new DocumentBuilder()
      .setTitle(this.configService.get('service').title)
      .setDescription(this.configService.get('service').description)
      .setVersion(this.configService.get('service').version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      `${this.configService.get('server').prefix}/docs`,
      app,
      document,
    );
  }
}
