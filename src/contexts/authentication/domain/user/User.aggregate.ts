import { AggregateRoot, Either, success, UniqueEntityID } from '../../../shared/domain';
import { Email } from './Email.value';
import { Password } from './Password.value';

interface UserProps {
    id?: UniqueEntityID;
    email: Email;
    password: Password;
}

export class UserAggregate extends AggregateRoot<UserProps> {
    private constructor(props: UserProps) {
        super(props);
    }

    public get value(): UserProps {
        return this.props;
    }

    public static create(props: UserProps): Either<null, UserAggregate> {
        return success(new UserAggregate(props));
    }
}
