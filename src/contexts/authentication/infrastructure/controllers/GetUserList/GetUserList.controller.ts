import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { Controller } from '../../../../shared/infrastructure';
import { GetUserListUseCase } from '../../../application/queries';
import { NotValidEmailException, NotValidPasswordException } from '../../../domain/user';

@injectable()
export class GetUserListController extends Controller {
    constructor(@inject(Symbols.GetUserListUseCase) private getUserList: GetUserListUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        /* const { email, password } = this.req.body; */

        const result = await this.getUserList.execute({});

        if (result.isException) {
            const error = result.getExceptionValue();

            switch (error.constructor) {
                case NotValidEmailException: {
                    return this.conflict(error.message);
                }
                case NotValidPasswordException: {
                    return this.conflict(error.message);
                }
            }
        }

        return this.created('user.success.list');
    }
}
