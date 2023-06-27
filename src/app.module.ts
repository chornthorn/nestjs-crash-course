import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
