import { Express, Router } from 'express';
import { inject, injectable } from 'inversify';
import { CreateUserController } from '../../../contexts/authentication/infrastructure';
import { Symbols } from '../../../env';
import { Routes } from '../../../types';

@injectable()
export class AuthenticationRoutes implements Routes<Express> {
    private router = Router();

    constructor(@inject(Symbols.CreateUserController) private createUserController: CreateUserController) {}

    configure(app: Express, path: string): void {
        this.router.post('/', (req, res) => this.createUserController.execute(req, res));

        app.use(path, this.router);
    }
}
