export interface Routes<T> {
    /**
     * configure
     */
    configure(app: T, path: string): void;
}
