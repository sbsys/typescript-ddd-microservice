import { Either, Result } from '../domain';

export interface UseCase<REQUEST, EXCEPTION, SUCCESS> {
    execute(request?: REQUEST): Promise<Either<EXCEPTION, Result<SUCCESS>>> | Either<EXCEPTION, Result<SUCCESS>>;
}
