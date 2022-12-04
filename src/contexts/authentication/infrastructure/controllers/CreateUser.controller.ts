import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { CreateUserUseCase } from '../../application/commands';
import { UserMessage } from '../../domain/user';

@injectable()
export class CreateUserController extends Controller {
    constructor(@inject(Symbols.CreateUserUseCase) private createUser: CreateUserUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { email, password } = this.req.body;

        const result = await this.createUser.execute({ email, password });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.created<UserMessage>('user.success.created');
    }
}
