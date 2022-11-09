import { container } from './env';
import { Api } from './apps';

container.resolve(Api).run();
