import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Page, Result } from '../../../shared/domain';
import { UserAggregate, UserError, UserRepository } from '../../domain/user';

export type GetUserListRequest = undefined;

type RESPONSE = Result<UserError, Page<UserAggregate>>;

@injectable()
export class GetUserListUseCase implements UseCase<GetUserListRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(): Promise<RESPONSE> {
        const userList = await this.userRepository.readAll({ page: 1, pp: 10 });

        if (userList.isError) return Result.Error(userList.getError());

        return Result.Success(userList.getSuccess());
    }
}
