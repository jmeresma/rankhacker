import '../App.css'
import PlayerChart from '../components/PlayerChart'
import PlayerList from '../components/PlayerList'





export function PlayerProfile() {



  return (
    <div className="flex justify-evenly">
        <div>
          <h1 className="font-extrabold text-center text-2xl text-sky-500 pt-4 pb-4">Player Profiles</h1>
            <div className="flex row h-screen space-x-10 flex auto space-x-24">
              <PlayerList />
              <PlayerChart />
            </div>
        </div>
     </div>
  )
}