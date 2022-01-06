
export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cashBalance?: number;
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
  cryptocurrencies: object
  watchlists?:Watchlist
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
  WatchlistCryptos: Array<string>
}

export interface Action {
  type: string;
  data?: any;
}

interface Cryptodetails {
  ticker: any;
  candlesticks:any;
}

export interface Ticker {
  price?: number;
}

export interface State {
  session: object;
  cryptodetails?: Cryptodetails;
  watchlists?: Watchlist
}

export interface Crypto {
  "id": string;
  "name": string;
  "min_size": string;
  "status": string;
  "message": string;
  "max_precision": string;
  "convertible_to": Array;
  "details": object;
}
