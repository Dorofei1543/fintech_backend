import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(): string {
    return this.authService.registration();
  }

  @Post('login')
  login(): string {
    return this.authService.login();
  }
}
