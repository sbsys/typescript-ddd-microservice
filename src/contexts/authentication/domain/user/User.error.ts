import { DomainError } from '../../../shared/domain';
import { UserMessage } from './User.message';

export class UserError extends DomainError<UserMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<UserMessage, ARGS> {
        return this.create('notfound', 'user.exceptions.id.notfound', args);
    }

    public static NotValidIdError<ARGS = unknown>(args?: ARGS): DomainError<UserMessage, ARGS> {
        return this.create('notvalid', 'user.exceptions.id.notvalid', args);
    }

    public static NotValidEmailError<ARGS = unknown>(args?: ARGS): DomainError<UserMessage, ARGS> {
        return this.create('notvalid', 'user.exceptions.email.notvalid', args);
    }

    public static EmailAlreadyExistError<ARGS = unknown>(args?: ARGS): DomainError<UserMessage, ARGS> {
        return this.create('conflict', 'user.exceptions.email.already', args);
    }

    public static NotValidPasswordError<ARGS = unknown>(args?: ARGS): DomainError<UserMessage, ARGS> {
        return this.create('notvalid', 'user.exceptions.password.notvalid', args);
    }
}
