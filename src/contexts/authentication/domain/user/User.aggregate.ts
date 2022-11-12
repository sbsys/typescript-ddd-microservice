import { AggregateRoot, Either, success, UniqueEntityID } from '../../../shared/domain';
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

    public static create(props: UserProps, id?: UniqueEntityID): Either<null, UserAggregate> {
        return success(
            new UserAggregate(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToSave(props: UserProps, id?: UniqueEntityID): Either<null, UserAggregate> {
        const user = new UserAggregate(
            {
                ...props,
            },
            id
        );
        user.addDomainEvent(UserCreatedEvent.create(user.id));

        return success(user);
    }
}
