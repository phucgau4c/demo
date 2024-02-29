import { collects, spends} from "./assets/data"
import {format} from 'date-fns'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


function App() {

  // format the number
  const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'VND' }).format(
    value
  );


  // format data

  const formatCollects = collects.map(collect => {
    return {
      date: format(collect.dateCreate, 'dd/MM/yyyy'),
      totalPrice: collect.totalPayment, 
      totalPayment: 0
    }
  })

  const formatSpends = spends.map(spend=>{
    return{
      date: format(spend.inputDay, 'dd/MM/yyyy'),
      totalPayment: spend.totalPayment,
      totalPrice: 0
    }
  })


  const formatData = formatCollects.concat(formatSpends).reduce((acc, cur)=>{
      const key = cur.date;
      if(acc[key]){
        acc[key] = {...acc[key], totalPrice:  Math.ceil(acc[key].totalPrice + cur.totalPrice), totalPayment: Math.ceil(acc[key].totalPayment + cur.totalPayment)}
      }else{
        acc[key] = {date: key, totalPrice: cur.totalPrice, totalPayment: cur.totalPayment}
      }
      return acc;
  }, {})

  const data = Object.values(formatData)



  return (
    <>
      <div style={{padding: '100px'}}>
        <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <Legend/>
          <XAxis dataKey='date'/>
          <YAxis  tickFormatter={(value)=> `${value/1000000}M`}/>
          <Bar dataKey='totalPrice' fill="#8884d8"/>
          <Bar dataKey='totalPayment' fill="#82ca9d"/>
          <Tooltip/>
        </BarChart>
      </ResponsiveContainer>
      </div>

    </>
  )
}

export default App
