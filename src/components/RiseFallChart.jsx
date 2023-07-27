
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList} from "recharts";
import { risersFallersChart } from "../api/risersfallerschart";
import { useQuery} from '@tanstack/react-query'




//use tanstack query to define param and filter data returned.





export default function RiseFallChart() {
 
  const useRisersData = useQuery({
    queryKey: ['risersfallerschart'], 
    queryFn: risersFallersChart,
    })

  if (useRisersData.status === "loading") return <h1 className="w-full">Loading...</h1>
  if (useRisersData.status === "error") {
      return <h1>{JSON.stringify(useRisersData.error)}</h1>
  }



  return (
    <div>
      <div className="flex-col"> 
        <h1 className="w-140 text-2xl pb-0 font-extrabold text-sky-800">Biggest Movers <span className="text-sm pb-0 font-thin text-sky-800">(Top 300 ECR vs 2 Weeks Ago)</span></h1>
      </div>
      <BarChart 
            width={600} 
            height={550} 
            data={useRisersData.data}
            layout="vertical"
      >
        {/* <CartesianGrid strokeDasharray="3 " /> */}
        <YAxis 
            tickLine={false}
            interval={0} 
            type="category" 
            dataKey="display_name"
            width={180} 
            tick={{fontSize: 10, strokeWidth: 2}}/>
        <XAxis 
            type="number" 
            ticks={[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25]} 
            fontSize={10}
            interval={0} 
            label={{value: "% Change in Rank", dy: 10, fontSize: 10}} 
            height={50}
            tickFormatter={(tick) => {
              return `${tick}%`;
              }}/>
        <Tooltip />
        <Legend 
          verticalAlign="top"
          align="right"
          iconSize={10}/>
        <Bar  
            dataKey="percent_move" 
            name="2 Week ECR % Change" 
            fill="rgb(125 211 252)" 

            label={{fill: 'black', fontSize: 10 }}/>
      </BarChart>
    </div>
  );
}
