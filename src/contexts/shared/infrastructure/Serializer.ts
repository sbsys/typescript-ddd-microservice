import { injectable } from 'inversify';
import { Result } from '../domain';

@injectable()
export abstract class Serializer<EXCEPTIONS, ENTITY, MODEL, DTO, RESPONSE> {
    public abstract fromEntityToDTO(entity: ENTITY): DTO;

    public abstract fromModelToEntity(model: MODEL): Result<EXCEPTIONS, ENTITY>;

    public abstract fromEntityToResponse(entity: ENTITY): RESPONSE;
}
