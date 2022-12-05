import { DomainEvent, UniqueEntityID } from '../../../shared/domain';
import { UserMessage } from './User.message';

export class UserCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME: UserMessage = 'user.events.created';

    public static create(aggregateId: UniqueEntityID): UserCreatedEvent {
        return new UserCreatedEvent({ aggregateId, eventName: this.EVENT_NAME, eventData: undefined });
    }
}
