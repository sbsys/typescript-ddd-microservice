import { UniqueEntityID } from './UniqueEntityID';

export interface Repository<T> {
    create(props: T): Promise<boolean>;

    readById(id: UniqueEntityID): Promise<T>;

    readAll(page: number, pp: number): Promise<T[]>;

    updateById(id: UniqueEntityID, props: T): Promise<boolean>;

    deleteById(id: UniqueEntityID): Promise<boolean>;
}
