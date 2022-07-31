/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from './AggregateRoot';
import { DomainEvent } from './DomainEvent';
import { UniqueEntityID } from './UniqueEntityID';

interface HandlersMap {
    [index: string]: ((event: DomainEvent) => void)[];
}

export class DomainEvents {
    private static handlersMap: HandlersMap = {};

    private static markedAggregates: AggregateRoot<any>[] = [];

    public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
        if (!this.findMarkedAggregateByID(aggregate.id)) this.markedAggregates.push(aggregate);
    }

    private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
        aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event));
    }

    private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
        const index = this.markedAggregates.findIndex(a => a.equals(aggregate));

        this.markedAggregates.splice(index, 1);
    }

    private static findMarkedAggregateByID(id: UniqueEntityID) {
        return this.markedAggregates.find(aggregate => aggregate.id.equals(id));
    }

    public static dispatchEventsForAggregate(id: UniqueEntityID): void {
        const aggregate = this.findMarkedAggregateByID(id);

        if (!aggregate) return;

        this.dispatchAggregateEvents(aggregate);
        aggregate.clearEvents();
        this.removeAggregateFromMarkedDispatchList(aggregate);
    }

    public static register(callback: (event: DomainEvent) => void, eventClassName: string): void {
        if (!this.handlersMap[eventClassName] || !Array.isArray(this.handlersMap[eventClassName]))
            this.handlersMap[eventClassName] = [];

        this.handlersMap[eventClassName]?.push(callback);
    }

    public static clearHandlers(): void {
        this.handlersMap = {};
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }

    private static dispatch(event: DomainEvent): void {
        if (!this.handlersMap[event.constructor.name] || !Array.isArray(this.handlersMap[event.constructor.name]))
            return;

        for (const handler of this.handlersMap[event.constructor.name] ?? []) handler(event);
    }
}
