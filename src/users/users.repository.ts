import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { AbstractRepoistory } from '../shared/repsitory.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepoistory<User> {
  constructor(protected readonly entityManager: EntityManager) {
    super(User, entityManager);
  }

  //TODO: custom methods
}
