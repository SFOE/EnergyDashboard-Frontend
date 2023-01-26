export function isDefined<T>(v: T | null | undefined): v is T {
    return v !== undefined && v !== null;
}
