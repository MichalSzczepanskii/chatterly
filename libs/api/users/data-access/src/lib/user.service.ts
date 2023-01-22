import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '@chatterly/api/users/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create({ ...dto, ...{ password: await bcrypt.hash(dto.password, 10) } });
    await this.userRepository.insert(user).catch(e => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException('Account with this email already exists.');
      }
      return e;
    });
    return user;
  }
}
