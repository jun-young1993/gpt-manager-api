import { IsNotEmpty, IsString } from "class-validator";

export class CheckAuthDto {

    @IsString()
    @IsNotEmpty()
    email : string
}
