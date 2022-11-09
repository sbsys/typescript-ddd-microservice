interface MergeString {
    joinValue: string;
    values: (false | null | undefined | string)[];
}

export const mergeString = ({ joinValue, values = [] }: MergeString): string => values.filter(Boolean).join(joinValue);

export const mergeRoutes = (...names: (false | null | undefined | string)[]) =>
    mergeString({ values: names, joinValue: '' });
