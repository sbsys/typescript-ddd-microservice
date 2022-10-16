import { Either, Result } from './Result';
import { UniqueEntityID } from './UniqueEntityID';

interface Paginate {
    page: number;
    pp: number;
}

interface Page<T> extends Paginate {
    total: number;
    data: T[];
}

export interface Repository<EXCEPTION, ENTITY> {
    create(props: ENTITY): Promise<Either<EXCEPTION, Result<void>>>;

    readById(id: UniqueEntityID): Promise<Either<EXCEPTION, Result<ENTITY>>>;

    readAll<Q>(paginate: Paginate, query?: Q): Promise<Either<EXCEPTION, Result<Page<ENTITY>>>>;

    updateById(id: UniqueEntityID, props: ENTITY): Promise<Either<EXCEPTION, Result<void>>>;

    deleteById(id: UniqueEntityID): Promise<Either<EXCEPTION, Result<void>>>;
}
