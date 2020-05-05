import React from 'react'

export const CheckBox = props => {
    return (
      <React.Fragment key={props.id}>
       <input className="category-checkbox"  onChange={props.handleCheck} type="checkbox" checked={props.isChecked} value={props.value}/> {props.value}
       </React.Fragment>
    )
}

export default CheckBox