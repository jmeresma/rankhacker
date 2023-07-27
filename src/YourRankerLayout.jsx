import { NavLink, Outlet} from "react-router-dom"


export function YourRankerLayout() {
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-cyan-100 p-2 top-1 sticky">
                <ul className="flex">
                    <li className="mr-6">
                        <NavLink className ="text-sm hover:text-blue-800" to="/yourranker">Your Ranker</NavLink>
                    </li>
                    <li className="mr-6">
                        <NavLink className ="text-sm hover:text-blue-800" to="/yourranker/cheatsheet">Your Cheat Sheet</NavLink>
                    </li>
                    <li className="mr-6">
                        <NavLink className ="text-sm hover:text-blue-800" to="/yourranker/watchlist">Your Watch List</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
        
}


