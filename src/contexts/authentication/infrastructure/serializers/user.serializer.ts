import { injectable } from 'inversify';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { Email, Password, UserAggregate, UserExceptions } from '../../domain/user';
import { CreateUserDTO, UserModel, UserResponse } from '../models';

@injectable()
export class UserSerializer extends Serializer<UserExceptions, UserAggregate, UserModel, CreateUserDTO, UserResponse> {
    public fromEntityToDTO(entity: UserAggregate): CreateUserDTO {
        return {
            id: entity.id.toString(),
            email: entity.props.email.value,
            password: entity.props.password.value,
        };
    }

    public fromModelToEntity(model: UserModel): Result<UserExceptions, UserAggregate> {
        const email = Email.create({ email: model.email });

        if (email.isException) return Result.Exception(email.getExceptionValue());

        const password = Password.create({ password: model.password });

        if (password.isException) return Result.Exception(password.getExceptionValue());

        const user = UserAggregate.create(
            {
                email: email.getSuccessValue(),
                password: password.getSuccessValue(),
            },
            new UniqueEntityID(model.id)
        );

        if (user.isException) return Result.Exception(user.getExceptionValue());

        return Result.Success(user.getSuccessValue());
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
