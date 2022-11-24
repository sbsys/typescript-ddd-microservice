import { Result } from './Result';
import { UniqueEntityID } from './UniqueEntityID';

export interface Paginate {
    page: number;
    pp: number;
}

export interface Page<T> extends Paginate {
    total: number;
    data: T[];
}

export interface Repository<EXCEPTIONS, ENTITY> {
    create(props: ENTITY): Promise<Result<EXCEPTIONS, void>>;

    readById(id: UniqueEntityID): Promise<Result<EXCEPTIONS, ENTITY>>;

    readAll<Q>(paginate: Paginate, query?: Q): Promise<Result<EXCEPTIONS, Page<ENTITY>>>;

    updateById(id: UniqueEntityID, props: ENTITY): Promise<Result<EXCEPTIONS, void>>;

    deleteById(id: UniqueEntityID): Promise<Result<EXCEPTIONS, void>>;
}
