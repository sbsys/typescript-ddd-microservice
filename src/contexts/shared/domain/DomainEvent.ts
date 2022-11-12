import { UniqueEntityID } from './UniqueEntityID';

export interface IDomainEvent {
    readonly aggregateId: UniqueEntityID;
    readonly eventId: UniqueEntityID;
    readonly eventName: string;
    readonly occurredOn: Date;

    getAggregateId(): UniqueEntityID;
}

type DomainEventProps = {
    aggregateId: UniqueEntityID;
    eventId?: UniqueEntityID;
    eventName: string;
    occurredOn?: Date;
};

export abstract class DomainEvent implements IDomainEvent {
    static EVENT_NAME: string;

    aggregateId: UniqueEntityID;
    eventId: UniqueEntityID;
    eventName: string;
    occurredOn: Date;

    protected constructor({ aggregateId, eventId, eventName, occurredOn }: DomainEventProps) {
        this.aggregateId = aggregateId;
        this.eventId = eventId || new UniqueEntityID();
        this.eventName = eventName;
        this.occurredOn = occurredOn || new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.aggregateId;
    }
}
