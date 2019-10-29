export const ensureTrailingSlash = (path: string): string => {
    if (!path) {
        throw new Error('The provided path cannot be empty.');
    }

    if (path[path.length - 1] !== '/') {
        path += '/';
    }

    return path;
};

export const ensureNoTrailingSlash = (path: string): string => {
    if (!path) {
        throw new Error('The provided path cannot be empty.');
    }

    if (path[path.length - 1] === '/') {
        return path.slice(0, -1);
    }

    return path;
};

export const ensureNoLeadingSlash = (path: string): string => {
    if (!path) {
        throw new Error('The provided path cannot be empty.');
    }

    if (path[0] === '/') {
        return path.substring(1);
    }

    return path;
};
