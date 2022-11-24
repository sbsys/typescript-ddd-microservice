import { isEqual } from 'underscore';
import { UniqueEntityID } from './UniqueEntityID';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (v: any): v is Entity<any> => v instanceof Entity;

export abstract class Entity<PROPS> {
    private readonly _id: UniqueEntityID;

    public readonly props: PROPS;

    constructor(props: PROPS, id?: UniqueEntityID) {
        this._id = id ?? new UniqueEntityID();

        this.props = props;
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    public equals(object?: Entity<PROPS>): boolean {
        if (object == null || object == undefined) return false;

        if (this === object) return true;

        if (isEqual(this, object)) return true;

        if (!isEntity(object)) return false;

        return this._id.equals(object._id);
    }
}
