import { DomainEvent } from '../domain';

export interface DomainEventHandler<ENTITY, EVENT extends DomainEvent<ENTITY>, RESPONSE = void> {
    setupSubscriptions(): void;

    onEvent(event: EVENT): Promise<RESPONSE>;
}
