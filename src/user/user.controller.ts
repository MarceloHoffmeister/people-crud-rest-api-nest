import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UpdateResult } from 'typeorm';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: UserDto): Promise<UserEntity> {
    return await this.userService.create(userData);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: UserDto,
  ): Promise<UpdateResult> {
    return await this.userService.update(+id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
