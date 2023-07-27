import '../App.css'
// import TeamList from '../components/TeamList'
import { Depth } from '../components/depthcharts/depthchart'
import { useParams } from 'react-router-dom'
import TeamTable from '../components/depthcharts/TeamTable'
import TeamList from '../components/depthcharts/TeamList'





export function DepthCharts() {

  const { team } = useParams()

  return (
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-center text-2xl text-sky-500 pt-4 pb-4">{team} Zustand Team Name Here!</h1>
            <div className="flex justify-evenly">
              <TeamList />
              <Depth />
              <TeamTable />
            </div>

            
        </div>
  )
}