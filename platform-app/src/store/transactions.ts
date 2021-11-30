import { Dispatch } from "redux";
import { Action, Transaction} from '../../module'

const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS'

const loadTransactions = (data:Array<Transaction>) => ({
  type: LOAD_TRANSACTIONS,
  data
})

export const getTransactions = (sessionUserId:number) => async(dispatch: Dispatch):Promise<any> => {
  const response = await fetch(`/api/users/${sessionUserId}/transactions`)
  if(response.ok) {
    const data = await response.json();
    console.log('======================', data)
    dispatch(loadTransactions(data));
    return null;
  }
}

export const addTransaction = (userId:number, cryptoId:string, price:number, quantity:number, buy:boolean) => async(dispatch:Dispatch):Promise<any> => {
  const response = await fetch(`api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      cryptoId,
      price,
      quantity,
      buy
    })
  })
  if(response.ok) {
    const data = await response.json();
    dispatch(loadTransactions(data))
    return null;
  }
}

const initialState = {}

const transactionsReducer = (state = initialState, action:Action) => {
  let newState;
  switch(action.type) {
    case LOAD_TRANSACTIONS:
      newState =Object.assign({}, state);
      action.data.forEach((transaction: Transaction) => {
        newState[transaction.id] = transaction
      });
      return newState;
    default:
      return state;
  }
}

export default transactionsReducer
