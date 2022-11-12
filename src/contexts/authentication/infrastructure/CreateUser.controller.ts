import { inject, injectable } from 'inversify';
import { Symbols } from '../../../env';
import { Controller } from '../../shared/infrastructure/Controller';
import { CreateUserUseCase } from '../application/commands';
import { NotValidEmailException, NotValidPasswordException } from '../domain/User';

@injectable()
export class CreateUserController extends Controller {
    constructor(@inject(Symbols.CreateUserUseCase) private createUser: CreateUserUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { email, password } = this.req.body;

        const result = await this.createUser.execute({ email, password });

        if (result.isException()) {
            const error = result.error;

            switch (error.constructor) {
                case NotValidEmailException: {
                    return this.conflict(error.getExceptionValue().message);
                }
                case NotValidPasswordException: {
                    return this.conflict(error.getExceptionValue().message);
                }
            }
        }

        return this.created('user.success.created');
    }
}
