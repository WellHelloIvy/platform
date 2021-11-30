
export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cashBalance: number;
}

export interface SignupUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Action {
  type: string;
  payload?:any;
}

interface Session {
  user: CurrentUser
}

export interface State {
  session: Session;
}

export interface StateErrors {

}

export interface ModalProviderProp {
  children?:any;
}

export interface ModalProps {
  onClose: React.ReactEventHandler<{}>;
  children?: any;
}

export interface Asset {
  id: number;
  userId: number;
  cryptoId: string;
  quantity: number;
}

export interface Transaction {
  id:number;
  userId:number;
  cryptoId:string;
  price:number;
  quantity:number;
  buy:number;
}

export interface Watchlist {
  id:number;
  userId:number;
  name:string;
}

export interface Action {
  type: string;
  data?: any;
}

export interface State {
  session: object;
}
