import { injectable } from 'inversify';
import { Either, exception, Result, success, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { CreateEmailExceptions, CreatePasswordExceptions, Email, Password, UserAggregate } from '../../domain/user';
import { CreateUserDTO, UserModel, UserResponse } from '../models';

export type UserSerializerExceptions = CreateEmailExceptions | CreatePasswordExceptions | undefined;

@injectable()
export class UserSerializer extends Serializer<
    UserSerializerExceptions,
    UserAggregate,
    UserModel,
    CreateUserDTO,
    UserResponse
> {
    public fromEntityToDTO(entity: UserAggregate): CreateUserDTO {
        return {
            id: entity.id.toString(),
            email: entity.props.email.value,
            password: entity.props.password.value,
        };
    }

    public fromModelToEntity(model: UserModel): Either<UserSerializerExceptions, Result<UserAggregate>> {
        const email = Email.create({ email: model.email });

        if (email.isException()) return exception(email.error);

        const password = Password.create({ password: model.password });

        if (password.isException()) return exception(password.error);

        const user = UserAggregate.create(
            {
                email: email.value.getValue(),
                password: password.value.getValue(),
            },
            new UniqueEntityID(model.id)
        );

        if (user.isException()) return exception(user.error);

        return success(Result.ok(user.value));
    }

    public fromEntityToResponse(entity: UserAggregate): UserResponse {
        return {
            id: entity.id.toString(),
            email: entity.props.email.value,
            password: entity.props.password.value,
            status: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
}
