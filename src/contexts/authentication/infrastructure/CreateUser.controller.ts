import { inject, injectable } from 'inversify';
import { Symbols } from '../../../env';
import { Controller } from '../../shared/infrastructure/Controller';
import { CreateUserUseCase } from '../application/commands';
import { InvalidUserEmailError, InvalidUserPasswordError } from '../domain/user';

@injectable()
export class CreateUserController extends Controller {
    constructor(@inject(Symbols.CreateUserUseCase) private createUser: CreateUserUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { email, password } = this.req.body;

        const result = await this.createUser.execute({ email, password });

        if (result.isException()) {
            const error = result.value;

            switch (error.constructor) {
                case InvalidUserEmailError: {
                    return this.conflict(error.getExceptionValue()?.message);
                }
                case InvalidUserPasswordError: {
                    return this.conflict(error.getExceptionValue()?.message);
                }
            }
        }

        return this.created('user.created');
    }
}
