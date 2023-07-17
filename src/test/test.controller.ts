import { Controller, Get } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Controller('test')
export class TestController {
  constructor() {}

  @Get('faker')
  faker() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      sample_word: faker.word.sample(),
      lorem_word: faker.lorem.word({ min: 3 }),
    };
  }
}
