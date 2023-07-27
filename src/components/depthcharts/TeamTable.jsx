
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { getTeamTable } from '../../api/teamtable';
import { useParams } from "react-router-dom";
import './../Ranker.css'




export default function TeamTable() {

    const { team } = useParams()

    const gridRef = useRef();
    
    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        cellStyle: {fontSize: '12px'}
    }), []);
    
    const [columnDefs, setColumnDefs] = useState([
    {
       field: 'display_name', 
        headerName: 'Player', 
        width: 190,
        filter: true,
    },
     {
        field: 'one_rank_change', 
         headerName: '1W +/-', 
         comparator: compareRanks, 
         width: 80,
         cellClassRules: {
            'riser': 'x >= 1',
            'bigriser': 'x >= 2',
            'vbigriser': 'x >= 6',
            'faller': 'x <= -1',
            'bigfaller': 'x <= -2',
            'vbigfaller': 'x <= -6',
         },
     },
     {
        field: 'two_rank_change', 
         headerName: '2W +/-', 
         comparator: compareRanks,
         width: 80,
         cellClassRules: {
            'riser': 'x >= 1',
            'bigriser': 'x >= 2',
            'vbigriser': 'x >= 6',
            'faller': 'x <= -1',
            'bigfaller': 'x <= -2',
            'vbigfaller': 'x <= -6',
         },
     },
     {
        field: 'four_rank_change', 
         headerName: '4W +/-', 
         comparator: compareRanks, 
         width: 80,
          cellClassRules: {
            'riser': 'x >= 1',
            'bigriser': 'x >= 2',
            'vbigriser': 'x >= 6',
            'faller': 'x <= -1',
            'bigfaller': 'x <= -2',
            'vbigfaller': 'x <= -6',
         },
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



   
    const useData = useQuery({
        queryKey: ["teamtable", team],
        queryFn: () => getTeamTable(team),
        })

    if (useData.status === "loading") return <h1>Loading...</h1>
    if (useData.status === "error") {
        return <h1>{JSON.stringify(useData.error)}</h1>
    }

const rowHeight = 30;


return (
    <div>
        <div className="flex-col"> 
            <h1 className="w-140 text-xl pb-0 font-extrabold text-sky-800">Team Risers & Fallers <span className="text-sm pb-0 font-thin text-sky-800"> (vs 1, 2, and 4 Weeks Ago)</span></h1>
        </div>
        <br/>
        <div className='ag-theme-alpine text-xs pb-0 font-thin text-sky-800' style={{height: 480, width: 432}}>
            <AgGridReact
                ref={gridRef}
                // onCellClicked={cellClickedListener}
                // onRowDoubleClicked={rowClickedListener}
                rowData ={useData.data.data}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
                animateRows={true}
                defaultColDef={defaultColDef}/>
        </div>
    </div>
    )
}