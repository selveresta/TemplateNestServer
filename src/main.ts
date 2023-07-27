import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './shared/logger/logger.service';

const PORT = process.env.PORT || 8555;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true
    });
    app.useLogger(app.get(LoggerService));

    await app.listen(PORT, onStart);
}

const onStart = () => {
    const logger = new LoggerService();
    logger.log(`Server start on port: ${PORT}`);
};

bootstrap();
