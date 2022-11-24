export interface UseCase<REQUEST, RESPONSE> {
    execute(request?: REQUEST): Promise<RESPONSE> | RESPONSE;
}
