import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { Email } from './Email.value';
import { Password } from './Password.value';
import { UserError } from './User.error';
import { UserCreatedEvent } from './UserCreated.event';

interface UserProps {
    email: Email;
    password: Password;
}

export class UserAggregate extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<UserError, UserAggregate> {
        return Result.Success(
            new UserAggregate(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToSave(props: UserProps, id: UniqueEntityID): Result<UserError, UserAggregate> {
        const user = this.create(props, id);

        if (user.isError) return Result.Error(user.getError());

        user.getSuccess().addDomainEvent(UserCreatedEvent.create(user.getSuccess().id));

        return Result.Success(user.getSuccess());
    }
}
