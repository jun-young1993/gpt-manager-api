import { IsEmail, IsOptional, IsString } from "class-validator";
import { User } from "../entities/user.entity";
import { IsNull } from "typeorm";

export class CreateUserDto {
	@IsEmail()
	email : string;

	@IsOptional()
	@IsString()
	name ?: string;

	toUserEntity() : User {
		return User.createFromDto(this);
	}
}
