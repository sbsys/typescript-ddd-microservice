import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { Controller } from '../../../../shared/infrastructure';
import { CreateUserUseCase } from '../../../application/commands';
import { NotValidEmailException, NotValidPasswordException } from '../../../domain/user';

@injectable()
export class CreateUserController extends Controller {
    constructor(@inject(Symbols.CreateUserUseCase) private createUser: CreateUserUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { email, password } = this.req.body;

        const result = await this.createUser.execute({ email, password });

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

        return this.created('user.success.created');
    }
}
