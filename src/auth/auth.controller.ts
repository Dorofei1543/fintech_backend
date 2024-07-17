import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
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
  login(): string {
    return this.authService.login();
  }

  @Get('me')
  async getAllUsers(@Query() login: string): Promise<RegisterUserDto> {
    return this.authService.getMe(login);
  }
}
