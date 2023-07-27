
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import { getPlayerData } from '../api/playerprofile';
import { useQuery} from '@tanstack/react-query'
import moment from "moment/moment";
import { useParams } from "react-router-dom";



//use tanstack query to define param and filter data returned.





export default function PlayerChart() {
 
  const { player } = useParams()

  const usePlayerData = useQuery({
    queryKey: ['playerRanks', player], 
    queryFn: () => getPlayerData(player),
    })

  if (usePlayerData.status === "loading") return <h1 className="w-full">Loading...</h1>
  if (usePlayerData.status === "error") {
      return <h1>{JSON.stringify(usePlayerData.error)}</h1>
  }



  return (
    <div>
      <div className="flex-col"> 
        <h1 className="w-72 text-2xl pb-0 font-extrabold text-sky-800">{player}</h1>
        <h2 className="w-72 text-sm pb-0 font-bold text-sky-800">{usePlayerData.data.data[usePlayerData.data.data.length-1].pos}</h2>
        <h2 className="w-72 text-sm pb-0 font-bold text-sky-800">{usePlayerData.data.data[usePlayerData.data.data.length-1].team}</h2>
      </div>
      <LineChart
      width={950}
      height={400}
      data={usePlayerData.data.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label={{value: "Date", position: "insideBottomRight", dy: 30}} dataKey="as_of" tickFormatter={d => moment(d).format("MMM Do YY")}  />
      <YAxis   label={{value: "Rank", position: "insideBottom", angle: -90, dx: -20, dy: -30}} ticks={[25, 50, 75, 100, 125, 150, 175, 200]} type="number" domain={[0, 200]}reversed={true}/>
      <Tooltip labelFormatter={d => moment(d).format("MMM Do YY")}/>
      <Legend align="left"/>
      <Line type="monotone" name="RFR" dataKey="rfr" stroke="#F24924" activeDot={{ r: 8 }}/>
      <Line type="monotone" name="ECR" dataKey="avg_rank" stroke="#CFCC0F" activeDot={{ r: 8 }}/>
      <Line type="monotone" name="RCR" dataKey="rcr" stroke="#2DD213" activeDot={{ r: 8 }}/>
      
    </LineChart>
    </div>


  );
}

