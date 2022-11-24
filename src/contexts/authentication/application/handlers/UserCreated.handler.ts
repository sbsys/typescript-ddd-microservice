import { injectable } from 'inversify';
import { DomainEventHandler } from '../../../shared/application';
import { DomainEvents } from '../../../shared/domain';
import { UserCreatedEvent } from '../../domain/user/UserCreated.event';

@injectable()
export class UserCreatedEventHandler implements DomainEventHandler<UserCreatedEvent> {
    constructor(/* instantiate use cases */) {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onEvent.bind(this), UserCreatedEvent.EVENT_NAME);
    }

    async onEvent(event: UserCreatedEvent): Promise<void> {
        console.log(event);
    }
}
