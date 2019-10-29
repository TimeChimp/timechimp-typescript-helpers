import { ITenantInfo, ItenantRouteInfo } from '@/common/models';

export function resolveTenant(): ItenantRouteInfo {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const info: ITenantInfo = ((<any> window).tenantInfo as ITenantInfo);
    let routeInfo: ItenantRouteInfo = null;

    if (info && info.identifier) {
        routeInfo = {
            identifier: info.identifier,
            useHost: true,
        };

        if (info.strategy) {
            routeInfo.useHost = info.strategy !== 'RouteStrategy';
        }
    } else {
        routeInfo = {
            identifier: 'timechimpw',
            useHost: false,
        };
    }

    return routeInfo;
}

