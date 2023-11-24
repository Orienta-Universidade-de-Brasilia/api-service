export class ReceiveFileDto {
  constructor(receivedData: any) {
    this.file = receivedData.file;

    // the received file has no buffer, we need to decode it from bufferB64
    const buffer = Buffer.from(receivedData.bufferB64, 'base64');
    this.file.buffer = buffer;
  }

  file: Express.Multer.File;
}
