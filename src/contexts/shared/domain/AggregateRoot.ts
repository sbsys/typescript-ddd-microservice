import { DomainEvent } from './DomainEvent';
import { DomainEvents } from './DomainEvents';
import { Entity } from './Entity';
import { UniqueEntityID } from './UniqueEntityID';

export abstract class AggregateRoot<PROPS> extends Entity<PROPS> {
    private _domainEvents: DomainEvent<AggregateRoot<PROPS>>[] = [];

    get id(): UniqueEntityID {
        return this._id;
    }

    get domainEvents(): DomainEvent<AggregateRoot<PROPS>>[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent<AggregateRoot<PROPS>>): void {
        this._domainEvents.push(domainEvent);

        DomainEvents.markAggregateForDispatch(this);

        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

    private logDomainEventAdded(domainEvent: DomainEvent<AggregateRoot<PROPS>>): void {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass?.constructor.name, '==>', domainEventClass?.constructor.name);
    }
}
