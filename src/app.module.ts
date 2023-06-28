import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AccessJwtAuthGuard } from './auth/guards/access-jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33061,
      username: 'root',
      password: 'example',
      database: 'example',
      entities: [User],
      // autoLoadEntities: true,
      synchronize: true, // DO NOT USE IN PRODUCTION
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      useClass: AccessJwtAuthGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AppModule {}
