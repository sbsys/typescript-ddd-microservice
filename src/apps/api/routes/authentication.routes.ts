import { Express, Router } from 'express';
import { inject, injectable } from 'inversify';
import {
    CreateUserController,
    GetUserListController,
} from '../../../contexts/authentication/infrastructure/controllers';
import { Symbols } from '../../../env';
import { Routes } from '../../../types';

@injectable()
export class AuthenticationRoutes implements Routes<Express> {
    private router = Router();

    constructor(
        @inject(Symbols.GetUserListController) private getUserListController: GetUserListController,
        @inject(Symbols.CreateUserController) private createUserController: CreateUserController
    ) {}

    configure(app: Express, path: string): void {
        this.router.get('/', (req, res) => this.getUserListController.execute(req, res));
        this.router.post('/', (req, res) => this.createUserController.execute(req, res));

        app.use(path, this.router);
    }
}
