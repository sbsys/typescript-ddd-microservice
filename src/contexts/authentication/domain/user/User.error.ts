import { DomainError } from '../../../shared/domain';
import { UserErrorMessage } from './User.message';

export class UserError extends DomainError<UserErrorMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<UserErrorMessage, ARGS> {
        return this.create('notfound', 'user.exceptions.id.notfound', args);
    }

    public static NotValidEmailError<ARGS = unknown>(args?: ARGS): DomainError<UserErrorMessage, ARGS> {
        return this.create('notvalid', 'user.exceptions.email.notvalid', args);
    }

    public static EmailAlreadyExistError<ARGS = unknown>(args?: ARGS): DomainError<UserErrorMessage, ARGS> {
        return this.create('conflict', 'user.exceptions.email.already', args);
    }

    public static NotValidPasswordError<ARGS = unknown>(args?: ARGS): DomainError<UserErrorMessage, ARGS> {
        return this.create('notvalid', 'user.exceptions.password.notvalid', args);
    }
}
