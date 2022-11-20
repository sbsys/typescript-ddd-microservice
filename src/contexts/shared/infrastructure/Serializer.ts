import { Either, Result } from '../domain';

export abstract class Serializer<EXCEPTION, ENTITY, MODEL, DTO, RESPONSE> {
    public abstract fromEntityToDTO(entity: ENTITY): DTO;

    public abstract fromModelToEntity(model: MODEL): Either<EXCEPTION, Result<ENTITY>>;

    public abstract fromEntityToResponse(entity: ENTITY): RESPONSE;
}
