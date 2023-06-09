import { IsNotEmpty, IsString } from "class-validator";

export class MailAuthDto {

    @IsString()
    @IsNotEmpty()
    email : string
}
