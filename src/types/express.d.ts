import { User } from 'src/auth/users/users.entity';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
