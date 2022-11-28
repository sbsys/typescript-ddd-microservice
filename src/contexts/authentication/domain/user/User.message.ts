import { CommonsErrorMessage } from '../../../shared/domain';

export type UserErrorMessage =
    | `user.exceptions.${'id.notfound' | 'email.notvalid' | 'email.already' | 'password.notvalid'}`
    | CommonsErrorMessage;

export type UserSuccessMessage = `user.success.${'created' | 'list'}`;

export type UserMessage = UserErrorMessage | UserSuccessMessage;
