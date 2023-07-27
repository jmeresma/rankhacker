
import {AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useMemo, useRef, useCallback} from 'react';
import { useQuery } from '@tanstack/react-query'
import { getTeamQB } from '../../api/qb';
import { useParams } from "react-router-dom";
import './../Ranker.css'





export default function TeamQB() {
    
    const { team } = useParams()

    const gridRef = useRef();

    const defaultColDef = useMemo( ()=> ({
        sortable: false,
        cellStyle: {fontSize: '12px',},   
    }), []);

    const [columnDefs, setColumnDefs] = useState([
    {   
        colId: 'tier',
        headerName: "Tier",

            valueGetter: p => {
            
                    return p.data.avg_rank / 6;
                },
            
            valueFormatter: p => {
                return Math.floor(p.value)+1;
            },
            width: 55,
            sortable: false,
            filter: false,

            cellStyle: params => {
                let weight = (params.value - 1)/(75 - 1);
                let red = weight * 250;
                let green = (1-weight) * 250;
                let blue = 100;
                return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
              }

            
    },   
    {
       field: 'player_name', 
        headerName: 'Quarterbacks', 
        width: 150,
        filter: true,
        cellStyle: {textAlign: "left"},
    },
    {
        field: 'avg_rank', 
         headerName: 'ECR', 
         comparator: compareRanks, 
         sortingOrder: ['asc'],
         width: 75,  
    },
]);

//comparator function to correctly sort ranks
        function compareRanks(value1, value2) {
            if (value1 === null && value2 === null) {
                return 0;
            }
            if (value1 === null) {
                return -1;
            }
            if (value2 === null) {
                return 1;
            }
            return value1 - value2;
            }


    const usedata = useQuery({
        queryKey: ["qbdata", team],
        queryFn: () => getTeamQB(team),
        })


    if (usedata.status === "loading") return <h1>Loading...</h1>
    if (usedata.status === "error") {
        return <h1>{JSON.stringify(usedata.error)}</h1>
    }




    const rowHeight = 25;
 

return (
        <div className='text-xs text-center pb-0 font-thin text-sky-800 ag-theme-alpine' style={{height: 225, width: 282}}>

            <AgGridReact
                ref={gridRef}
                // onCellClicked={cellClickedListener}
                // onRowDoubleClicked={rowClickedListener}

                rowData ={usedata.data.data}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
                animateRows={true}
                enableCellChangeFlash={true}
                defaultColDef={defaultColDef}/>
        </div>
    )
}
