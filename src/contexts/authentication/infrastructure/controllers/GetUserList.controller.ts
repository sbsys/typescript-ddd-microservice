import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { GetUserListUseCase } from '../../application/queries';
import { UserMessage } from '../../domain/user';
import { UserSerializer } from '../serializers';

@injectable()
export class GetUserListController extends Controller {
    constructor(
        /* use case */
        @inject(Symbols.GetUserListUseCase) private getUserList: GetUserListUseCase,
        /* serializer */
        @inject(Symbols.UserSerializer) private userSerializer: UserSerializer
    ) {
        super();
    }

    protected async implementation(): Promise<void> {
        /* const { email, password } = this.req.body; */

        const result = await this.getUserList.execute();

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.created<UserMessage>('user.success.list', {
            ...result.getSuccess(),
            data: result.getSuccess().data.map(user => this.userSerializer.fromEntityToResponse(user)),
        });
    }
}
