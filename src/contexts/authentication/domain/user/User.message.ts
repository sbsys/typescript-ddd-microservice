import { CommonsErrorMessage } from '../../../shared/domain';

export type UserMessage =
    | `user.${
          | `exceptions.${'id.notfound' | 'id.notvalid' | 'email.notvalid' | 'email.already' | 'password.notvalid'}`
          | `success.${'created' | 'list'}`
          | `events.${'created'}`}`
    | CommonsErrorMessage;
