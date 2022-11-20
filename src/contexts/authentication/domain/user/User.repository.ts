import { Either, Repository, Result } from '../../../shared/domain';
import { CreateEmailExceptions, Email } from './Email.value';
import { CreatePasswordExceptions } from './Password.value';
import { UserAggregate } from './User.aggregate';
import { NotFoundIdException } from './User.exceptions';

export type UserRepositoryErros = NotFoundIdException | CreateEmailExceptions | CreatePasswordExceptions | undefined;

export interface UserRepository extends Repository<UserRepositoryErros, UserAggregate> {
    isEmailAvailable(email: Email): Promise<Either<UserRepositoryErros, Result<void>>>;
}
