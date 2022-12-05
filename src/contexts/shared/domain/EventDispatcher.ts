import { AggregateRoot } from './AggregateRoot';
import { DomainEvent } from './DomainEvent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DispatchersMap<T = any> {
    [index: string]: ((event: DomainEvent<T>) => void)[];
}

export class EventDispatcher {
    private static dispatchersMap: DispatchersMap = {};

    public static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>): void {
        aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event));
    }

    public static registerDispatcher<T>(callback: (event: DomainEvent<T>) => void, eventName: string): void {
        if (!this.dispatchersMap[eventName] || !Array.isArray(this.dispatchersMap[eventName]))
            this.dispatchersMap[eventName] = [];

        this.dispatchersMap[eventName]?.push(callback);
    }

    public static clearHandlers(): void {
        this.dispatchersMap = {};
    }

    private static dispatch(event: DomainEvent): void {
        this.dispatchersMap[event.eventName]?.forEach(handler => handler(event));
    }
}
