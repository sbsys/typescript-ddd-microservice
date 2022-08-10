import { DomainEvent } from '../domain';

export interface DomainEventHandler<ENTITY, DE extends DomainEvent<ENTITY>, RESPONSE> {
    setupSubscriptions(): void;

    onEvent(event: DE): Promise<RESPONSE>;
}
