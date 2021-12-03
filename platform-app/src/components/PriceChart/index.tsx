import { useSelector } from 'react-redux';
import { LineChart, Line } from 'recharts';
import { State } from '../../../module';

const PriceChart = () => {
  const candleStickData = useSelector((state:State) => state.cryptodetails?.candlesticks)
  // console.log('------------->',candleStickData)

  // const data = [{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},{uv: 2}];
  return(
    <LineChart width={400} height={400} data={candleStickData}>
      <Line type="monotone" dataKey="closingPrice" stroke="#8884d8" />
    </LineChart>
  )
}

export default PriceChart
