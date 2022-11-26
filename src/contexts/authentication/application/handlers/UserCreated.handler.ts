import { injectable } from 'inversify';
import { DomainEventHandler } from '../../../shared/application';
import { DomainEvents } from '../../../shared/domain';
import { UserCreatedEvent } from '../../domain/user/UserCreated.event';

@injectable()
export class UserCreatedEventHandler implements DomainEventHandler<UserCreatedEvent> {
    constructor() {
        /* instantiate use cases */
        /* instantiate services */
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onEvent.bind(this), UserCreatedEvent.EVENT_NAME);
    }

    async onEvent(event: UserCreatedEvent): Promise<void> {
        console.error('DISPATCHED', event);
    }
}
