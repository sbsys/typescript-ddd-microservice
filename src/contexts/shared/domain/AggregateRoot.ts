import { DomainEvent } from './DomainEvent';
import { DomainEvents } from './DomainEvents';
import { Entity } from './Entity';
import { Logger } from '../../../env';
import { UniqueEntityID } from './UniqueEntityID';

export abstract class AggregateRoot<PROPS> extends Entity<PROPS> {
    private _domainEvents: DomainEvent[] = [];

    get id(): UniqueEntityID {
        return this._id;
    }

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);

        DomainEvents.markAggregateForDispatch(this);

        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

    private logDomainEventAdded(domainEvent: DomainEvent): void {
        const thisClass = Reflect.getPrototypeOf(this);

        Logger.info(
            `[Domain Event Created]: ${thisClass?.constructor.name} ==> '${
                domainEvent.eventName
            }' on ${domainEvent.occurredOn.toISOString()}`
        );
    }
}
