import { AggregateRoot, Either, exception, success, UniqueEntityID } from '../../../shared/domain';
import { Email } from './Email.value';
import { Password } from './Password.value';
import { UserCreatedEvent } from './UserCreated.event';

interface UserProps {
    email: Email;
    password: Password;
}

export class UserAggregate extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Either<undefined, UserAggregate> {
        return success(
            new UserAggregate(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToSave(props: UserProps, id: UniqueEntityID): Either<undefined, UserAggregate> {
        const user = this.create(props, id);

        if (user.isException()) return exception(user.error);

        user.value.addDomainEvent(UserCreatedEvent.create(user.value.id));

        return success(user.value);
    }
}
