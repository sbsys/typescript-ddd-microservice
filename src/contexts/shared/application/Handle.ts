export interface Handle<DomainEvent, T> {
    setupSubscriptions(): void;

    onEvent(event: DomainEvent): Promise<T>;
}
