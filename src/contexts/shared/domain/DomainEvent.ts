import { UniqueEntityID } from './UniqueEntityID';

export interface DomainEvent<T> {
    value?: T;
    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID;
}
