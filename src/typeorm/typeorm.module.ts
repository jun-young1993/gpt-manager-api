
import {TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";
import {ConfigModule} from "../config/config.module";




@Module({
    imports : [
        NestTypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            useFactory : (configService : ConfigService) => ({
                logging : true,
                type: configService.get<string>('db.type'),
                host: configService.get<string>('db.host'),
                port: configService.get<string>('db.port'),
                username: configService.get<string>('db.username'),
                password: configService.get<string>('db.password'),
                database: configService.get<string>('db.database'),
                // entities : ["dist/**/*.entity{.ts,.js}"],
                entities : [process.env.PWD+"/dist/**/*.entity{.ts,.js}"],
                // entities : [User],
                synchronize : true,
                autoLoadEntities: true,
            } as TypeOrmModuleOptions),
            inject: [ConfigService]
        })
    ],
    exports : [NestTypeOrmModule]
})
export class TypeOrmModule{}
