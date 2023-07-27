
import '../App.css'
import RiseFallChart from '../components/RiseFallChart'
import RiseFallTable from '../components/RiseFallTable'




export function RisersFallers() {

  return (
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-center text-2xl text-sky-500 pt-4 pb-4">Risers & Fallers</h1>
            <div className="flex justify-evenly">
              <RiseFallChart />
              <RiseFallTable />
            </div>
        </div>
  )
}