import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create({
      ...dto,
      ...{ password: await bcrypt.hash(dto.password, 10) },
    });
    await this.userRepository.insert(user).catch(e => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.'
        );
      }
      return e;
    });
    return user;
  }

  async deleteUserById(id: number) {
    return await this.userRepository.delete(id);
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    return await this.userRepository.update(
      {
        id: userId,
      },
      dto
    );
  }

  async getUsersByPartialName(name: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name like :name and user.isActive = true', {
        name: `%${name}%`,
      })
      .getMany();
  }
}
