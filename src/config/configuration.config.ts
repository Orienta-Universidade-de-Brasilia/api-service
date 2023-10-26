export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.mongo = {
      db: process.env.MONGO_DATABASE,
      user: process.env.MONGO_USER,
      host: process.env.MONGO_HOST,
      password: process.env.MONGO_PASSWORD,
    };
    this.envConfig.auth = {
      secretKey: process.env.JWT_SECRET_KEY,
    };
    this.envConfig.service = {
      title: process.env.SERVICE_TITLE,
      description: process.env.SERVICE_DESCRIPTION,
      version: process.env.SERVICE_VERSION,
      tag: process.env.SERVICE_TAG,
    };
    this.envConfig.server = {
      port: +process.env.SERVICE_PORT || 3000,
      isEnabled: process.env.NODE_ENV === 'development',
      prefix: '/api',
    };
    this.envConfig.cloudinary = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    };
    this.envConfig.mailer = {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      mailFrom: process.env.MAIL_FROM,
    };
  }
  get(key: string): any {
    return this.envConfig[key];
  }
}
