import { useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { State } from '../../../module';

const PriceChart = () => {
  const candleStickData = useSelector((state: State) => state.cryptodetails?.candlesticks)

  return (
    <LineChart width={800} height={200} data={candleStickData}>
      <Line type="monotone" dataKey="closingPrice" stroke="#8884d8" dot={false} />
      <CartesianGrid stroke="#ccc" strokeDasharray="1 1"/>
      <XAxis dataKey="date" hide={true}/>
      <YAxis  domain={['dataMin', 'dataMax']}/>
      <Tooltip />
    </LineChart>
  )
}

export default PriceChart
