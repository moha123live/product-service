import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3002;
  console.log(`Product Service running on port ${port}`);
  await app.listen(port);
}
bootstrap();
