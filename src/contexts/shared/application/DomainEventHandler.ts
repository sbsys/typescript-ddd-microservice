import { DomainEvent } from '../domain';

export interface DomainEventHandler<EVENT extends DomainEvent> {
    setupSubscriptions(): void;

    onEvent(event: EVENT): Promise<void>;
}
