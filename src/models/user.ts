export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    roleId?: number
  ) {
    if (id !== undefined) {
      this.id = id;
    }
    username && (this.username = username);
    password && (this.password = password);
    firstName && (this.firstName = firstName);
    lastName && (this.lastName = lastName);
    email && (this.email = email);
    if (roleId !== undefined) {
      this.roleId = roleId;
    }
  }
}
