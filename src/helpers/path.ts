import { resolveTenant } from './resolvers';

export function getTenantPathPrefix(): string {
    const info = resolveTenant();

    let prefix = '';
    if (info && !info.useHost) {
        prefix = '/' + info.identifier;
    }

    return prefix;
}

