import {Controller, Get, Param, Req} from '@nestjs/common';

import { TasksService } from 'src/tasks/tasks.service';
import {GoogleGeoCode} from "../google-trends/google-trends.interface";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('chat-sync')
  async tasks(@Req() req) {
    console.log(req.user);

    return await this.tasksService.syncChat();
  }

  @Get('daily')
  async daily() {
    return await this.tasksService.daily();
  }
}
