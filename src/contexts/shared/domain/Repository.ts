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

export interface Repository<E, S> {
    create(props: S): Promise<Either<E, Result<void>>>;

    readById(id: UniqueEntityID): Promise<Either<E, Result<S>>>;

    readAll<Q>(paginate: Paginate, query?: Q): Promise<Either<E, Result<Page<S>>>>;

    updateById(id: UniqueEntityID, props: S): Promise<Either<E, Result<void>>>;

    deleteById(id: UniqueEntityID): Promise<Either<E, Result<void>>>;
}
