import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { RegisterUserDto, registerUserSchema } from './pipes/userPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async registration(@Body() user: RegisterUserDto): Promise<User> {
    return this.authService.registration(user);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: any; refreshToken: any }> {
    return this.authService.login(loginUserDto);
  }

  @Get('me')
  async getAllUsers(@Query() login: string): Promise<RegisterUserDto> {
    return this.authService.getMe(login);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
}
