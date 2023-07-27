
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useQuery } from '@tanstack/react-query'
import { getTeamList } from '../../api/teamlist';
import { NavLink } from 'react-router-dom';






export default function TeamList() {

    const teamListData = useQuery({
        queryKey: ['teamlist'],
        queryFn: getTeamList,
        })

    if (teamListData.status === "loading") return <h1>Loading...</h1>
    if (teamListData.status === "error") {
        return <h1>{JSON.stringify(teamListData.error)}</h1>
    }


    
return (
    <>

    <ul className="overflow-y-auto h-[36rem] border-r-4	border-right-width: 8px min-w-min">
        {teamListData?.data.map((team) => {
        return <li key={team.team}>
            <NavLink to={`/depthcharts/${team.team}`} className='text-sm font-thin text-base'>{team.name}</NavLink>
        </li>
    })}

    </ul>

    
    </>

    )
}

