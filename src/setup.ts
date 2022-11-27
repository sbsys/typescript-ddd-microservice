import { container } from './env';
import { Api } from './apps';
/* authentication handlers */
import { UserCreatedEventHandler } from './contexts/authentication/application/handlers';

function handlers(): void {
    const handlerList = [UserCreatedEventHandler];

    handlerList.map(currentHandler => container.resolve(currentHandler).setupSubscriptions());
}

function setup() {
    container.resolve(Api).run();

    handlers();
}

export { setup };
