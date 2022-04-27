import React from 'react'
import {Checkbox} from 'primereact/checkbox';

import './FilterboxComponent.scss'

export default function FilterboxCompoenent({filterTxt, items, selected, onFilterChange}) {
    return (
        <div className="filter-box-container" >
            <div className="box-header">
                <small className="head-lbl"> <strong>{filterTxt} </strong></small>
                <small className="see-all"> See all ({items.length})</small>
            </div>
            <div className="filter-items">

            {items.map((item, i) => (
                <div className="p-field-checkbox">
                    <Checkbox inputId={`filter${item.id}`} name={`filter${item.id}`} value={item.id} onChange={onFilterChange}  checked={selected.indexOf(item.id) !== -1} />
                    <label htmlFor={`filter${item.id}`}>{item.name}</label>
                </div>

             ))}
               

            </div>
            
        </div>
    )
}
