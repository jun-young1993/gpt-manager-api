import {ConfigModule as NestConfigModule} from "@nestjs/config";
import configuration from "./configuration";
import {Module} from "@nestjs/common";




@Module({
    imports : [
        NestConfigModule.forRoot({
            isGlobal: true,
            load : [configuration]
        })
    ],
    exports : [NestConfigModule]
})
export class ConfigModule {}