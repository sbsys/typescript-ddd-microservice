import { Either } from '../domain';

export interface UseCase<REQUEST, EXCEPTION, SUCCESS> {
    execute(request?: REQUEST): Promise<Either<EXCEPTION, SUCCESS>> | Either<EXCEPTION, SUCCESS>;
}
