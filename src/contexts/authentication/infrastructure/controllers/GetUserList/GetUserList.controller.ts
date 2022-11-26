import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { Controller } from '../../../../shared/infrastructure';
import { GetUserListUseCase } from '../../../application/queries';
import { NotValidEmailException, NotValidPasswordException } from '../../../domain/user';
import { UserSerializer } from '../../serializers';

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

        if (result.isException) {
            const error = result.getExceptionValue();

            switch (error.constructor) {
                case NotValidEmailException: {
                    return this.conflict(error.message);
                }
                case NotValidPasswordException: {
                    return this.conflict(error.message);
                }
                default: {
                    return this.conflict(error.message);
                }
            }
        }

        return this.created('user.success.list', {
            ...result.getSuccessValue(),
            data: result.getSuccessValue().data.map(user => this.userSerializer.fromEntityToResponse(user)),
        });
    }
}
