import { Module } from '@nestjs/common';
import { LoggerModule } from './shared/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './entities/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../configs/.env.development'
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('HOST'),
                port: +configService.get('PORT'),
                username: configService.get('USERNAME'),
                password: configService.get('PASSWORD'),
                database: configService.get('DATABASE'),
                models: []
            })
        }),
        LoggerModule,
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
