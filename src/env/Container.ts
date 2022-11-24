import 'reflect-metadata';
import { Container } from 'inversify';
import { Symbols } from './Symbols';
/* serializers */
import { UserSerializer } from '../contexts/authentication/infrastructure/serializers';
/* repositories */
import { UserRepository } from '../contexts/authentication/domain/user';
import { InMemoryUserRepository } from '../contexts/authentication/infrastructure/repositories';
/* use cases */
import { CreateUserUseCase } from '../contexts/authentication/application/commands';
import { GetUserListUseCase } from '../contexts/authentication/application/queries';
/* handlers */
import { UserCreatedEventHandler } from '../contexts/authentication/application/handlers';
/* controllers */
import { CreateUserController, GetUserListController } from '../contexts/authentication/infrastructure/controllers';
/* routes */
import { AuthenticationRoutes } from '../apps/api/routes';
/* apps */
import { Api } from '../apps';

const container = new Container();
/* serializers */
container.bind<UserSerializer>(Symbols.UserSerializer).to(UserSerializer);
/* repositories */
container.bind<UserRepository>(Symbols.UserRepository).to(InMemoryUserRepository);
/* use cases */
container.bind<CreateUserUseCase>(Symbols.CreateUserUseCase).to(CreateUserUseCase);
container.bind<GetUserListUseCase>(Symbols.GetUserListUseCase).to(GetUserListUseCase);
/* handlers */
container.bind<UserCreatedEventHandler>(Symbols.UserCreatedEventHandler).to(UserCreatedEventHandler);
/* controllers */
container.bind<CreateUserController>(Symbols.CreateUserController).to(CreateUserController);
container.bind<GetUserListController>(Symbols.GetUserListController).to(GetUserListController);
/* routes */
container.bind<AuthenticationRoutes>(Symbols.AuthenticationRoutes).to(AuthenticationRoutes);
/* apps */
container.bind<Api>(Symbols.Api).to(Api);

export { container };
