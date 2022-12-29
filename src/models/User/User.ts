import { IUser } from './IUser';
class User implements IUser {
  uid: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isAuthorized: boolean;
  constructor(authData: IUser) {
    this.uid = authData.uid;
    this.email = authData.email;
    this.username = authData.username;
    this.isAuthorized = authData.isAuthorized;
    this.isAdmin = authData.isAdmin;
  }
}

export default User;
