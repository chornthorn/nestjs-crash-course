import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const userExists = await this.usersService.findOneByEmail(loginDto.email);

    if (!userExists) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatch = await this.usersService.compareHash(
      loginDto.password,
      userExists.password, // hash from database
    );

    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    // generate jwt token
    const token = await this.jwtService.signAsync({
      userId: userExists.id,
    });

    if (!token) {
      throw new BadRequestException('Invalid email or password');
    }

    return {
      access_token: token,
      token_type: 'bearer',
    };
  }

  async register(dto: RegisterDto) {
    const userExists = await this.usersService.findOneByEmail(dto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.create(dto);

    if (!user) {
      throw new BadRequestException('Register failed');
    }

    // generate jwt token
    const token = await this.jwtService.signAsync({
      userId: user.id,
    });

    if (!token) {
      throw new BadRequestException('Invalid email or password');
    }

    return {
      access_token: token,
      token_type: 'bearer',
    };
  }
}
