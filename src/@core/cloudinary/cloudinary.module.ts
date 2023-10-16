import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary';
import { ConfigService } from '@config/configuration.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.cloudinary.env'],
      isGlobal: true,
    }),
  ],
  providers: [
    CloudinaryService,
    Cloudinary,
    {
      provide: 'CONFIG',
      useClass: ConfigService,
    },
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
