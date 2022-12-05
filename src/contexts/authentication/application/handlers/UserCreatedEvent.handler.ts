import { injectable } from 'inversify';
import { DomainEventHandler } from '../../../shared/application';
import { EventDispatcher } from '../../../shared/domain';
import { UserCreatedEvent } from '../../domain/user/UserCreated.event';

@injectable()
export class UserCreatedEventHandler implements DomainEventHandler {
    constructor() {
        /* instantiate use cases */
        /* instantiate services */
    }

    setupSubscriptions(): void {
        EventDispatcher.registerDispatcher(this.onUserCreatedEvent.bind(this), UserCreatedEvent.EVENT_NAME);
    }

    private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
        console.error('DISPATCHED', event);
    }
}
