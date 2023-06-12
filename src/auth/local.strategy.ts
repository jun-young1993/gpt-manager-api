import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		// private readonly userService : UserService
	){
		super({
			usernameField : 'email'
		});
	}

	async validate(id: string) : Promise<User | NotFoundException>{
		// return await this.userService.findOneOrFail(id);
		console.log(id);
		return new User();
	}
}