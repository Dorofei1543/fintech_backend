import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registration(): string {
    return 'Registration';
  }

  login(): string {
    return 'Login';
  }
}
