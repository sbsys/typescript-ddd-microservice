import { Repository, Result } from '../../../shared/domain';
import { Email } from './Email.value';
import { UserAggregate } from './User.aggregate';
import { UserError } from './User.error';

export interface UserRepository extends Repository<UserError, UserAggregate> {
    isEmailAvailable(email: Email): Promise<Result<UserError, void>>;
}
