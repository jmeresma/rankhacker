
import Ranker from '../components/Ranker'



export function Home() {

  return (
        <div className="flex items-center justify-center">
            <div>
            <h1 className="font-extrabold text-center text-2xl text-sky-500 pt-4 pb-4">Ranks</h1>
            <Ranker />
            </div>
        </div>
  )
}