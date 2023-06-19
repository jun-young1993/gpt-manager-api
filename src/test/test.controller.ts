import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import JwtAuthGuard from 'src/jwt/jwt-auth.guard';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly tasksService: TasksService
    ) {}

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    console.log(req.user);

    return this.testService.findAll();
  }

  @Get('tasks')
  async tasks(@Req() req) {
    console.log(req.user);

    return await this.tasksService.syncChat();
  }

}
