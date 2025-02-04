import { User } from '../interface/user.interface';

export const displayName = (user: User) => {
  if(user.lastName){
    return user.lastName;
  }
  return user.email;
}