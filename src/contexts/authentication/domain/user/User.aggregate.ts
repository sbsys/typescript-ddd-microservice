import { AggregateRoot, Either, success, UniqueEntityID } from '../../../shared/domain';
import { Name } from './Name.value';

interface UserProps {
    id?: UniqueEntityID;
    name: Name;
}

export class UserAggregate extends AggregateRoot<UserProps> {
    private constructor(props: UserProps) {
        super(props);
        this.props.name = props.name;
    }

    public get value(): UserProps {
        return this.props;
    }

    public static create(props: UserProps): Either<null, UserAggregate> {
        return success(new UserAggregate(props));
    }
}
