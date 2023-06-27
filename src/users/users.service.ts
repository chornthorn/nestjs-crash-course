import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userEntity);

    if (!user) {
      throw new BadRequestException('User not created');
    }

    return user;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['firstName', 'lastName'],
      searchableColumns: ['firstName', 'lastName'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const userUpdated = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    if (!userUpdated) {
      throw new BadRequestException('User not updated');
    }

    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const userDeleted = await this.userRepository.delete(id);
    if (!userDeleted) {
      throw new BadRequestException('User not deleted');
    }

    return {
      message: 'User delete successfully',
    };
  }
}
