import { isEqual } from 'underscore';

interface ValueObjectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}

export abstract class ValueObject<PROPS extends ValueObjectProps> {
    public readonly props: PROPS;

    constructor(props: PROPS) {
        this.props = Object.freeze(props);
    }

    public equals(vo?: ValueObject<PROPS>): boolean {
        if (vo === null || vo === undefined) return false;

        if (vo.props === undefined) return false;

        return isEqual(this.props, vo.props);
    }
}
