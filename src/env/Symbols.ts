export const Symbols = {
    /* serializers */
    UserSerializer: Symbol.for('UserSerializer'),
    /* repositories */
    UserRepository: Symbol.for('UserRepository'),
    /* use cases */
    CreateUserUseCase: Symbol.for('CreateUserUseCase'),
    GetUserListUseCase: Symbol.for('GetUserListUseCase'),
    /* handlers */
    UserCreatedEventHandler: Symbol.for('UserCreatedEventHandler'),
    /* controllers */
    CreateUserController: Symbol.for('CreateUserController'),
    GetUserListController: Symbol.for('GetUserListController'),
    /* routes */
    AuthenticationRoutes: Symbol.for('AuthenticationRoutes'),
    /* apps */
    Api: Symbol.for('Api'),
};
