import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user[0].password))) {
      const { password, ...result } = user[0];

      return result;
    }

    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.userId,
      }),
    };
  }
}
