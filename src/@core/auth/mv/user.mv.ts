export class UserModelView {
  token: string;
  user: User;
  role: Role;
}

export class User {
  name: string;
  email: string;
  gender: `${GenderEnum}`;
  avatarUrl: string;
}

export enum GenderEnum {
  male = 'M',
  female = 'F',
}

export class Role {
  id: string;
  type: string;
}
