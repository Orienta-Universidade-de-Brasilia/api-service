import { BadRequestException, Injectable } from '@nestjs/common';
import { Cloudinary } from './cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private cloudinary: Cloudinary) {}

  async create(fileTransferable: Express.Multer.File) {
    try {
      return await this.cloudinary.upload(fileTransferable);
    } catch (error) {
      throw new BadRequestException(`Failed to upload file:: ${error.message}`);
    }
  }

  async getFileUrl(fileId: string) {
    return this.cloudinary.getFileUrl(fileId);
  }

  async remove(id: string) {
    return this.cloudinary.delete(id);
  }
}
