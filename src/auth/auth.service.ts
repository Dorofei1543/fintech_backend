import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './pipes/userPipe';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly users: RegisterUserDto[] = [];

  async registration(user: RegisterUserDto): Promise<User> {
    const userDto = this.usersRepository.create(user);
    return this.usersRepository.save(userDto);
  }

  login(): string {
    return 'Login';
  }

  getMe(username: string): RegisterUserDto {
    return this.users.find((user) => user.username === username);
  }
}
