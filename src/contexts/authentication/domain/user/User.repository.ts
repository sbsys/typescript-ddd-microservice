import { Repository, Result } from '../../../shared/domain';
import { Email } from './Email.value';
import { UserAggregate } from './User.aggregate';
import { UserExceptions } from './User.exceptions';

export interface UserRepository extends Repository<UserExceptions, UserAggregate> {
    isEmailAvailable(email: Email): Promise<Result<UserExceptions, void>>;
}
