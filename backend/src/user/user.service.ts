import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;

    // Hash the password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt); // Ensure you hash this password in a real application!

    return await this.userRepository.save(user);
  }

  async findAll(page: number, limit: number, sortOrder: string): Promise<User[]> {
    const skip = (page - 1) * limit;
    const query = this.userRepository
      .createQueryBuilder('user')
      .skip(skip)
      .take(limit);

    if (sortOrder === 'desc') {
      query.orderBy('user.id', 'DESC');
    } else {
      query.orderBy('user.id', 'ASC');
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {

    // If the password field is present in the updateUserDto, hash it
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
