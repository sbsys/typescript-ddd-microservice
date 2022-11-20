export const Symbols = {
    /* serializers */
    UserSerializer: Symbol.for('UserSerializer'),
    /* repositories */
    UserRepository: Symbol.for('UserRepository'),
    /* use cases */
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    /* controllers */
    CreateUserController: Symbol.for('CreateUserController'),
    /* routes */
    AuthenticationRoutes: Symbol.for('AuthenticationRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
