import { injectable } from 'inversify';
import { UseCase } from '../../../../shared/application';
import { DomainEvents, Result } from '../../../../shared/domain';
import { UserExceptions } from '../../../domain/user';
import { GetUserListRequest } from './GetUserList.request';

type RESPONSE = Result<UserExceptions, void>;

@injectable()
export class GetUserListUseCase implements UseCase<GetUserListRequest, RESPONSE> {
    async execute(request: GetUserListRequest): Promise<RESPONSE> {
        console.log('request', request);
        console.log('EVENTS', DomainEvents);

        return Result.Success();
    }
}
