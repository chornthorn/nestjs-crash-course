import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/access-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'jasdjfalksjd',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
