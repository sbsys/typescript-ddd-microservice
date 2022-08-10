import { Either } from '../domain';

export interface UseCase<R, E, S> {
    execute(request?: R): Promise<Either<E, S>> | Either<E, S>;
}
