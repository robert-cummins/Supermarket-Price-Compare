import React from 'react'
import { connect } from 'react-redux'
import { changeCategorys } from '../actions/index'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCheck = (e) => {
    this.props.dispatch(changeCategorys(e.target.getAttribute('name')))
  }



  render() {
    return (

      this.props.categorys.map(category => {
        return (
          <div  onClick={this.handleCheck} className={'category-checkbox'} key={category.id}>
            <input onChange={this.handleCheck} type="checkbox" checked={category.isChecked} value={category.value} /> {category.value}
            <span name={category.value}></span>
          </div>)
      })


    )
  }
}

const mapStateToProps = (state) => {
  return {
    categorys: state.categorys
  }
}

export default connect(mapStateToProps)(Checkbox)