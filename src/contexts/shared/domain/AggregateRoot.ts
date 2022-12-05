import { DomainEvent } from './DomainEvent';
import { Entity } from './Entity';
import { Logger } from '../../../env';
import { EventDispatcher } from './EventDispatcher';

export abstract class AggregateRoot<PROPS> extends Entity<PROPS> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);

        this.logDomainEventAdded(domainEvent);
    }

    public dispathEvents(): void {
        EventDispatcher.dispatchAggregateEvents(this);

        this.clearEvents();
    }

    private clearEvents(): void {
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
