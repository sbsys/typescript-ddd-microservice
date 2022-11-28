import { injectable } from 'inversify';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { Email, Password, UserAggregate, UserError } from '../../domain/user';
import { CreateUserDTO, UserModel, UserResponse } from '../models';

@injectable()
export class UserSerializer extends Serializer<UserError, UserAggregate, UserModel, CreateUserDTO, UserResponse> {
    public fromEntityToDTO(entity: UserAggregate): CreateUserDTO {
        return {
            id: entity.id.toString(),
            email: entity.props.email.value,
            password: entity.props.password.value,
        };
    }

    public fromModelToEntity(model: UserModel): Result<UserError, UserAggregate> {
        const email = Email.create({ email: model.email });

        if (email.isError) return Result.Error(email.getError());

        const password = Password.create({ password: model.password });

        if (password.isError) return Result.Error(password.getError());

        const user = UserAggregate.create(
            {
                email: email.getSuccess(),
                password: password.getSuccess(),
            },
            new UniqueEntityID(model.id)
        );

        if (user.isError) return Result.Error(user.getError());

        return Result.Success(user.getSuccess());
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
