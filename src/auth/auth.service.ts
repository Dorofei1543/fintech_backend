import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './pipes/userPipe';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registration(user: RegisterUserDto): Promise<User> {
    const userDto = this.usersRepository.create(user);
    userDto.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save(userDto);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: any; refreshToken: any }> {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    const passwordComparing = await bcrypt.compare(password, user.password);
    if (user && passwordComparing) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '15m' },
      );
      return {
        access_token: newAccessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
