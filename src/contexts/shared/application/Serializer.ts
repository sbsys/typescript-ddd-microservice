import { Either } from '../domain';

export interface Serializer<EXCEPTION, ENTITY, MODEL, DTO> {
    fromEntityToModel(entity: ENTITY): MODEL;

    fromModelToEntity(model: MODEL): Either<EXCEPTION, ENTITY>;

    fromEntityToResponse(entity: ENTITY): DTO;
}
