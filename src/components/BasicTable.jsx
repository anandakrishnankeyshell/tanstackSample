import React, { useMemo } from 'react'
import mData from '../MOCK_DATA.json'
import { ColumnsVal } from './Columns'
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table'


const BasicTable = () => {
       
    const data = useMemo(() => mData, [])

    // console.log(data);


    const columns = ColumnsVal

    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel:getCoreRowModel(),
        })

        // console.log(data);

    return (

        <>
            <h2 style={{textAlign:"center"}}>Sample table</h2>

            <table style={{textAlign:"center"}}>
                <thead>
                    {table.getHeaderGroups().map(headerGroups => (
                        <tr key={headerGroups.id}>
                            {headerGroups.headers.map(header => (
                                <th key={header.id} style={{padding:'20px 40px'}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
        </>


    )
}

export default BasicTable