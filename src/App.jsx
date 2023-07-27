import './App.css'
import { NavLink, Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { CheatSheet } from './pages/CheatSheet'
import { PlayerProfile } from './pages/PlayerProfile'
import { RisersFallers } from './pages/RisersFallers'
import { WatchList } from './pages/WatchList'
import { SignIn } from './pages/SignIn'
import { Register } from './pages/Register'
import { YourRanker } from './pages/YourRanker'
import { YourRankerLayout } from './YourRankerLayout'
import { DepthCharts } from './pages/DepthCharts'
import { PositionReview } from './pages/PositionReview'



export default function App() {


  return (
    <>
      <nav className="font-base text-sky-800 flex items-center justify-between flex-wrap bg-neutral-300 p-6 top-0 sticky">
        <ul className="flex">
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/">Ranks</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/yourranker">Custom Ranks</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/risersfallers">Risers & Fallers</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/polarizingplayers">Risk Assessment</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/positionreviews">Position Ranks</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/playerprofiles/Christian McCaffrey">Players</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/depthcharts/ARI">Depth Charts</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/signin">Sign In</NavLink>
          </li>
          <li className="mr-6">
            <NavLink className ="hover:text-blue-800" to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yourranker" element={<YourRankerLayout />}>
            <Route index element={<YourRanker />} />
            <Route path="watchlist" element={<WatchList />} />
            <Route path="cheatsheet" element={<CheatSheet />} />
          </Route>
        <Route path="/risersfallers" element={<RisersFallers />} />
        <Route path="/playerprofiles/:player" element={<PlayerProfile />} />
        <Route path="/positionreviews" element={<PositionReview />} />
        <Route path="/depthcharts/:team" element={<DepthCharts />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
} 


