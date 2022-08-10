import { DomainEvent } from '../domain';

export interface DomainEventHandler<DE extends DomainEvent, T> {
    setupSubscriptions(): void;

    onEvent(event: DE): Promise<T>;
}
