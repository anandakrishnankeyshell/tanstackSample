import React, { useMemo, useState } from 'react'
import mData from '../MOCK_DATA.json'
import { ColumnsVal } from './Columns'
import { flexRender,
     useReactTable,
      getCoreRowModel ,
      getPaginationRowModel,
      getSortedRowModel,
      getFilteredRowModel,
    } from '@tanstack/react-table'


const BasicTable = () => {
       
    const data = useMemo(() => mData, [])

    // console.log(data);

    const [sorting,setSorting] = useState([])
    const [filtering,setFiltering]=useState('')

    // console.log(filtering);

    const columns = ColumnsVal
 
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel:getCoreRowModel(),
            getPaginationRowModel:getPaginationRowModel(),
            getSortedRowModel:getSortedRowModel(),
            getFilteredRowModel:getFilteredRowModel(),
            state:{
                sorting:sorting,
                globalFilter:filtering,
            },
            onSortingChange:setSorting,
            onGlobalFilterChange:setFiltering,
        })


    return (

        <>
            <h2 style={{textAlign:"center"}}>Sample table</h2>
            <input type="text" placeholder='search' value={filtering} onChange={(e)=>setFiltering(e.target.value)}/>
            <table style={{textAlign:"center"}}>
                <thead>
                    {table.getHeaderGroups().map(headerGroups => (
                        <tr key={headerGroups.id}>
                            {headerGroups.headers.map(header => (
                                <th key={header.id} style={{padding:'20px 40px'}}
                                onClick={header.column.getToggleSortingHandler()}
                                 >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                         {asc:'⬆️',desc:'⬇️'}[header.column.getIsSorted()??null]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row=>(
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell=>(
                                <td key={cell.id} style={{padding:'5px 10px'}}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
               <button onClick={()=>table.setPageIndex(0)}>first page</button>
               <button disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>previous</button>
               <button disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>next</button>
               <button onClick={()=>table.setPageIndex(table.getPageCount()-1)}>last page</button>
            </div>
        </>


    )
}

export default BasicTable