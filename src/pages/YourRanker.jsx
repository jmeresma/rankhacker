
import UserRanker from '../components/UserRanker'



export function YourRanker() {

  return (
        <div className="flex items-center justify-center">
            <div>
            <h1 className="font-extrabold text-center text-2xl text-sky-500 pt-4 pb-4">Your Ranker</h1>
            <UserRanker />
            </div>

        </div>
  )
}