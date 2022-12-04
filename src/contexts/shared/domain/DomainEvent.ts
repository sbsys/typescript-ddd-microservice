import { UniqueEntityID } from './UniqueEntityID';

type DomainEventProps = {
    aggregateId: UniqueEntityID;
    eventId?: UniqueEntityID;
    eventName: string;
    occurredOn?: Date;
};

export abstract class DomainEvent {
    static EVENT_NAME: string;

    readonly aggregateId: UniqueEntityID;
    readonly eventId: UniqueEntityID;
    readonly eventName: string;
    readonly occurredOn: Date;

    protected constructor({ aggregateId, eventId, eventName, occurredOn }: DomainEventProps) {
        this.aggregateId = aggregateId;
        this.eventId = eventId || new UniqueEntityID();
        this.eventName = eventName;
        this.occurredOn = occurredOn || new Date();
    }
}
