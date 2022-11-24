import { DomainEvent } from '../domain';

export interface DomainEventHandler<EVENT extends DomainEvent, RESPONSE = void> {
    setupSubscriptions(): void;

    onEvent(event: EVENT): Promise<RESPONSE>;
}
