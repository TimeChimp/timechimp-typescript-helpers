import { maxChar } from './max-char';

export function slugify(str: string, separator: any, max: number) {
    if (!str) {
        return '';
    }

    str = str.trim();
    str = str.toLowerCase();

    const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaaaeeeeiiiioooouuuunc------';

    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '')
                .replace(/-/g, separator);

    return maxChar(str, max);
}
