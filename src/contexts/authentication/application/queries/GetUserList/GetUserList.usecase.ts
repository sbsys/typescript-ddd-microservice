import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { UseCase } from '../../../../shared/application';
import { Page, Result } from '../../../../shared/domain';
import { UserAggregate, UserExceptions, UserRepository } from '../../../domain/user';
import { GetUserListRequest } from './GetUserList.request';

type RESPONSE = Result<UserExceptions, Page<UserAggregate>>;

@injectable()
export class GetUserListUseCase implements UseCase<GetUserListRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(): Promise<RESPONSE> {
        const userList = await this.userRepository.readAll({ page: 1, pp: 10 });

        if (userList.isException) return Result.Exception(userList.getExceptionValue());

        return Result.Success(userList.getSuccessValue());
    }
}
