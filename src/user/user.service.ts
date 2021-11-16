import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: UserDto): Promise<UserEntity> {
    let { password } = userData;

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    return plainToClass(
      UserEntity,
      await this.userRepository.save(<UserEntity>{
        ...userData,
        password,
      }),
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, userData: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, userData);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { email } });
  }
}
