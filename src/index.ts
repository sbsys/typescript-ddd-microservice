import { container } from './env';
import { Api } from './apps';
import { UserCreatedEventHandler } from './contexts/authentication/application/handlers';

container.resolve(Api).run();

container.resolve(UserCreatedEventHandler).setupSubscriptions();
