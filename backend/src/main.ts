import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*', //allwoing all for now
    origin: '*',
    credentials: true,
  })
  await app.listen(3005);
  
  console.clear()
  process.stdout.write('\x1b[32m'); 
  process.stdout.write('Block Explorer Backend Monitor\n');
  process.stdout.write('\x1b[0m');
  process.stdout.write(`Total connected: ${0}\r`);
}
bootstrap();
