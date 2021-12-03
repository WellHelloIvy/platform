import { useSelector } from 'react-redux';
import { LineChart, Line } from 'recharts';
import { State } from '../../../module';

const PriceChart = () => {
  const candleStickData = useSelector((state:State) => state.cryptodetails?.candlesticks)

  return(
    <LineChart width={800} height={200} data={candleStickData}>
      <Line type="monotone" dataKey="closingPrice" stroke="#8884d8" dot={false} />
    </LineChart>
  )
}

export default PriceChart
