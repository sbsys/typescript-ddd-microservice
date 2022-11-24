import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { Email } from './Email.value';
import { Password } from './Password.value';
import { NotValidEmailException } from './User.exceptions';
import { UserCreatedEvent } from './UserCreated.event';

interface UserProps {
    email: Email;
    password: Password;
}

export class UserAggregate extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<NotValidEmailException, UserAggregate> {
        return Result.Success(
            new UserAggregate(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToSave(props: UserProps, id?: UniqueEntityID): Result<NotValidEmailException, UserAggregate> {
        const user = this.create(props, id);

        if (user.isException) return Result.Exception(user.getExceptionValue());

        user.getSuccessValue().addDomainEvent(UserCreatedEvent.create(user.getSuccessValue().id));

        return Result.Success(user.getSuccessValue());
    }
}
