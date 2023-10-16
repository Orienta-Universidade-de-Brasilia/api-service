import { ServerConfig } from '@config/server.config';

async function bootstrap() {
  const server = new ServerConfig();
  await server.init();
}

bootstrap();
