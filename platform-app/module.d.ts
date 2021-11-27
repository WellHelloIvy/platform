export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cashBalance: number;
}

export interface LoginUser {
  id: number;
  email: string;
  password: string;
}

export interface Action {
  type: string;
  payload?:any;
}
