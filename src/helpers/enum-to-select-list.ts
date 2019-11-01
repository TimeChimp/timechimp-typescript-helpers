import { SelectItem } from '../common/models/interfaces/select-item';


export function enumToSelectList(myEnum: any): SelectItem[] {
    const list = Object.keys(myEnum)
        .filter((k) => typeof myEnum[k as any] !== 'number')
        .map((key) => ({
            id: parseInt(key, 10),
            name: `${myEnum[key]}`,
        }));

    return list.filter((x) => x.id !== 0);
}
