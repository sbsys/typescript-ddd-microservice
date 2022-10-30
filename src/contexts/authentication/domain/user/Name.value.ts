import { Either, exception, Result, success, ValueObject } from '../../../shared/domain';
import { InvalidUserNameError } from './User.error';

export interface NameProps {
    value: string;
}

export class Name extends ValueObject<NameProps> {
    public get value(): string {
        return this.props.value;
    }

    public static create(props: NameProps): Either<InvalidUserNameError<NameProps>, Result<Name>> {
        if (props.value.length === 0) return exception(InvalidUserNameError.create(props));

        return success(Result.ok<Name>(new Name(props)));
    }
}
