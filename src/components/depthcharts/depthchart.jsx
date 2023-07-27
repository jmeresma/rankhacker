import '../../App.css'
// import TeamList from '../components/TeamList'
import TeamRB from './RB'
import TeamWR from './WR'
import TeamQB from './QB'
import TeamTE from './TE'
import { useParams } from 'react-router-dom'






export function Depth() {

  const { team } = useParams()

  return (
    <div>
        <h1 className="w-140 text-xl pb-0 font-extrabold text-sky-800">Fantasy Depth</h1>
        <br/>
        <div className="flex justify-evenly space-x-8">
            <div className="space-y-8">
                <TeamQB />
                <TeamRB /> 
            </div>
            <div className="space-y-8">
                <TeamWR />
                <TeamTE />                
            </div>  
        </div>   
    </div>

  )
}

