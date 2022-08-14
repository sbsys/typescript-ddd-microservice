import { UniqueEntityID } from './UniqueEntityID';

export interface DomainEvent<T = null> {
    value?: T;
    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID;
}
