import { Either, Result } from './Result';
import { UniqueEntityID } from './UniqueEntityID';

export interface Repository<E, R> {
    create(props: R): Promise<Either<E, Result<void>>>;

    readById(id: UniqueEntityID): Promise<Either<E, Result<R>>>;

    readAll(page: number, pp: number): Promise<Either<E, Result<R[]>>>;

    updateById(id: UniqueEntityID, props: R): Promise<Either<E, Result<void>>>;

    deleteById(id: UniqueEntityID): Promise<Either<E, Result<void>>>;
}
