
import {AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { getRanks } from '../api/ranks';
import { postUserRanks } from '../api/userranks';
import './Ranker.css'





export default function YourRanker() {
    
    const gridRef = useRef();
    

    const onCellChange = useCallback( () => {
            console.log('change'),
            gridRef.current.columnApi.applyColumnState({
                state: [{ colId: 'you', sort: null}, {colId: 'hide', filter: true}]
            }),
            gridRef.current.columnApi.applyColumnState({
                state: [{ colId: 'you', sort: 'asc'}]
            })
      }, []);


    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        cellStyle: {fontSize: '13px',},   
    }), []);



    const [columnDefs, setColumnDefs] = useState([
    {   
        colId: 'tier',
        headerName: "Tier",

        valueGetter: p => {
            if(p.data.target === 'Above') {
                return p.data.rcr / 6;
            } else {
            if(p.data.target === 'Below') {
                return p.data.rfr / 6;
            } else {
                return p.data.avg_rank / 6;
              }
            }
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
       field: 'player_name', 
        headerName: 'Player', 
        width: 200,
        filter: true,
        cellStyle: {textAlign: "left"}
    },
    {
        field: 'pos', 
         headerName: 'Pos',
         width: 70, 
         filter: true,
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
        field: 'team', 
         headerName: 'Team',
         width: 85, 
         filter: true,
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
    {
        field: 'target', 
         headerName: 'YOU vs ECR', 
         cellEditorPopup: true,
         editable: true,
         cellEditor: 'agSelectCellEditor',
         cellEditorParams: {
          values: ['Above', 'Below'],
          cellEditorPopup: true,
          cellEditorPopupPosition: 'under',
         },
         width: 100,
         sortable: false,
         filter: false,
    },
    {
         
        colId:'you',
         headerName: 'YOU',
         comparator: compareRanks, 
         sortingOrder: ['asc'],
         width: 85, 
         cellStyle: {color:'#317873', backgroundColor: '#f0f1fc'},

         valueGetter: p => {
            if(p.data.target === 'Above') {
                return p.data.rcr;                

            } else {
            if(p.data.target === 'Below') {
                return p.data.rfr;
            } else {
                return p.data.avg_rank;
              }
            }
        }
    },
 
    // {
    //     colId: 'hide', 
    //      headerName: 'Hide', 
    //      cellEditorPopup: true,
    //      editable: true,
    //      checkboxSelection: true,
    //      width: 60,
    //      sortable: false,
    //      filter: false,
    // }
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

        
    function saveUserTargets() {
        let userTargetsArray = [];
        gridRef.current.api.forEachNode(node => userTargetsArray.push([node.data.player_id, node.data.target, 1]));
       
        let userTargetsObject = userTargetsArray.map(([player_id, target, user_id]) => ({player_id, target, user_id}));        
        
        const userTargetList = userTargetsObject.filter(target => target.target === 'Target' || target.target === 'Avoid');
        
        console.log(userTargetList)
        } 




    const rankerDataQuery = useQuery({
        queryKey: ["ranks"],
        queryFn: getRanks,
        })

    if (rankerDataQuery.status === "loading") return <h1>Loading...</h1>
    if (rankerDataQuery.status === "error") {
        return <h1>{JSON.stringify(rankerDataQuery.error)}</h1>
    }

    
    
    
    
    const rowClassRules = {
        // apply green to target
        'above': function(params) { return params.data.target === 'Above'; },
   
        // apply red avoid
        'below': function(params) { return params.data.target === 'Below'; },

    };



    const rowHeight = 25;
 

return (
        <div className='text-xs text-center font-thin text-sky-800 ag-theme-alpine' style={{height: 500, width: 850}}>
            <button onClick={saveUserTargets} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Save</button>

            <br/>
            <br/>
            <AgGridReact
                ref={gridRef}
                // onCellClicked={cellClickedListener}
                // onRowDoubleClicked={rowClickedListener}
                onCellValueChanged={onCellChange}
                rowDragManaged={true}
                rowData ={rankerDataQuery.data}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
                rowSelection='multiple'
                animateRows={true}
                enableCellChangeFlash={true}
                defaultColDef={defaultColDef}
                rowClassRules={rowClassRules}/>
        </div>
    )
}


