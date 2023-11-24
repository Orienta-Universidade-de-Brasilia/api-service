import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { SwaggerService } from '@common/swagger/swagger.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ConfigService } from './configuration.config';

export class ServerConfig {
  private configService: ConfigService;
  private swaggerService: SwaggerService;
  constructor() {
    this.configService = new ConfigService();
    this.swaggerService = new SwaggerService();
  }

  async init() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix(this.configService.get('server').prefix);
    this.swaggerService.init(app);

    const port: number = +process.env.PORT || 3000;

    await app
      .listen(port)
      .then(() => {
        console.log(`Listening on port: ${port}`);
      })
      .catch((err) => {
        console.log(`Unable to stabilish connection:: ${err.message}`);
      });
  }
}
