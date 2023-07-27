
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { getRanks } from '../api/ranks';
import moment from "moment/moment";
import './Ranker.css'




export default function Ranker() {

    const gridRef = useRef();
    
    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        cellStyle: {fontSize: '13px',},   
    }), []);
    
    const [columnDefs, setColumnDefs] = useState([
    {   
        headerName: "ECR Tier",
          valueGetter: p => {
          return p.data.avg_rank / 6;
          },
          valueFormatter: p => {
          return Math.floor(p.value)+1;
          },
          width: 60,
          sortable: false,
          filter: false,
          cellClassRules: {
            'odd': params => params.value % 2 <= 1,
            'even': params => params.value % 2 >= 1,
        }
    },
    {   
       headerName: "ECR Rank",
        valueGetter: "node.rowIndex + 1",
        width: 70,
        sortable: false,
        filter: false,
    },
    
    {
       field: 'display_name', 
        headerName: 'Player', 
        filter: true,
        width: 225,
        cellStyle: {textAlign: "left"}
    },
    {
        field: 'pos', 
         headerName: 'Pos',
         filter: true,
         width: 85, 
         cellClassRules: {
            'qb': params => params.value === 'QB',
            'wr': params => params.value === 'WR',
            'rb': params => params.value === 'RB',
            'te': params => params.value === 'TE',
            'k': params => params.value === 'K',
            'dst': params => params.value === 'DST',
         },
    },
    {
        field: 'rfr', 
         headerName: 'RFR', 
         comparator: compareRanks, 
         sortingOrder: ['asc'],
         width: 85,
    },
    {
        field: 'avg_rank', 
         headerName: 'ECR', 
         comparator: compareRanks, 
         sortingOrder: ['asc'],
         width: 85, 
    },
    {
        field: 'rcr', 
         headerName: 'RCR', 
         comparator: compareRanks, 
         sortingOrder: ['asc'],
         width: 85, 
    },
    // {
    //     field: 'ecr_risk_profile', 
    //      headerName: 'Risk vs ECR',  
    //      sortable: false,
    //      width: 85, 
    //      cellClassRules: {
    //         'safe': params => params.value === 'SAFE',
    //         'risky': params => params.value === 'RISKY️',
    //      },
    // },
    // {
    //     field: 'ecr_upside_potential', 
    //      headerName: 'Upside vs ECR', 
    //      sortable: false,
    //      width: 85, 
    //      cellClassRules: {
    //         'high': params => params.value === 'HIGH',
    //         'limited': params => params.value === 'LIMITED',
    //      },
    // },
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



   
    const rankerDataQuery = useQuery({
        queryKey: ["ranks"],
        queryFn: getRanks,
        })

    if (rankerDataQuery.status === "loading") return <h1>Loading...</h1>
    if (rankerDataQuery.status === "error") {
        return <h1>{JSON.stringify(rankerDataQuery.error)}</h1>
    }

const rowHeight = 25;


const update = moment(rankerDataQuery.data[0].as_of).format("M/D/YYYY");

return (
        
        <div className='text-xs text-center font-thin text-sky-800 ag-theme-alpine' style={{height: 500, width: 697}}>
            Updated on: {update}
            <AgGridReact
                ref={gridRef}
                rowDragManaged={true}
                rowHeight={rowHeight}
                rowData ={rankerDataQuery.data}
                columnDefs={columnDefs}
                rowSelection='multiple'
                animateRows={true}
                enableCellChangeFlash={true}
                defaultColDef={defaultColDef}/>
            
        </div>
    )
}


