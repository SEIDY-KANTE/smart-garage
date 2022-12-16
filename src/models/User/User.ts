import UserType from './UserType';
class User {
  uid: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isAuthorized: boolean;
  constructor(authData: UserType) {
    this.uid = authData.uid;
    this.email = authData.email;
    this.username = authData.username;
    this.isAuthorized = authData.isAuthorized;
    this.isAdmin = authData.isAdmin;
  }
}

export default User;
