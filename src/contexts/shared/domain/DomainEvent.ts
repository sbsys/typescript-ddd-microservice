import { UniqueEntityID } from './UniqueEntityID';

interface DomainEventProps<T> {
    eventId?: UniqueEntityID;
    aggregateId: UniqueEntityID;
    eventName: string;
    eventData: T;
    occurredOn?: Date;
}

export abstract class DomainEvent<T = unknown> {
    readonly eventId: UniqueEntityID;
    readonly aggregateId: UniqueEntityID;
    readonly eventName: string;
    readonly eventData: T;
    readonly occurredOn: Date;

    protected constructor({ eventId, aggregateId, eventName, eventData, occurredOn }: DomainEventProps<T>) {
        this.eventId = eventId || new UniqueEntityID();
        this.aggregateId = aggregateId;
        this.eventName = eventName;
        this.eventData = eventData;
        this.occurredOn = occurredOn || new Date();
    }
}
