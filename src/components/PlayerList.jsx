
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { getPlayerList } from '../api/playerlist';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';






export default function PlayerList() {

    const rankerDataQuery = useQuery({
        queryKey: ['playerlist'],
        queryFn: getPlayerList,
        })

    if (rankerDataQuery.status === "loading") return <h1>Loading...</h1>
    if (rankerDataQuery.status === "error") {
        return <h1>{JSON.stringify(rankerDataQuery.error)}</h1>
    }


    
return (
    <>

    <ul className="overflow-y-auto h-[36rem] border-r-4	border-right-width: 8px min-w-min">
        {rankerDataQuery?.data.map((player) => {
        return <li key={player.player_name}>
            <NavLink to={`/playerprofiles/${player.player_name}`} className='font-thin text-sm'>{player.player_name}  <span className='font-thin text-xs text-sky-800'>({player.pos})</span></NavLink>
        </li>
    })}

    </ul>

    
    </>

    )
}

