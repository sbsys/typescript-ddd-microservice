import { DomainEvent, UniqueEntityID } from '../../../shared/domain';

export class UserCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME = 'user.events.created';

    public static create(aggregateId: UniqueEntityID): UserCreatedEvent {
        return new UserCreatedEvent({ aggregateId, eventName: this.EVENT_NAME });
    }
}
