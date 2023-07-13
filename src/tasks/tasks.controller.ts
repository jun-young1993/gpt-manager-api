import {Controller, Get, Param, Post, Req} from '@nestjs/common';

import { TasksService } from 'src/tasks/tasks.service';
import {GoogleGeoCode} from "../google-trends/google-trends.interface";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('chat-sync')
  async tasks(@Req() req) {
    console.log(req.user);

    return await this.tasksService.syncChat();
  }

  @Post('daily')
  async daily() {
    return await this.tasksService.daily();
  }

  @Post('topic')
  async topic() {
    return await this.tasksService.topic();
  }
}
