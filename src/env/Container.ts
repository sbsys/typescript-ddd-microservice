import 'reflect-metadata';
import { Container } from 'inversify';
import { CreateUserUseCase } from '../contexts/authentication/application/commands';
import { Symbols } from '.';
import { CreateUserController } from '../contexts/authentication/infrastructure';
import { Api } from '../apps';
import { AuthenticationRoutes } from '../apps/api/routes';

const container = new Container();
/* repositories */
/* use cases */
container.bind<CreateUserUseCase>(Symbols.CreateUserUseCase).to(CreateUserUseCase);
/* controllers */
container.bind<CreateUserController>(Symbols.CreateUserController).to(CreateUserController);
/* routes */
container.bind<AuthenticationRoutes>(Symbols.AuthenticationRoutes).to(AuthenticationRoutes);
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
