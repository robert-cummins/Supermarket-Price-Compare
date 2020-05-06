import React from 'react'
import { connect } from 'react-redux'
import { changeCategorys } from '../actions/index'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCheck = (e) => {
    this.props.dispatch(changeCategorys(e.target.value))
  }



  render() {
    return (

      this.props.categorys.map(category => {
        return <React.Fragment key={category.id}>
          <input className="category-checkbox" onChange={this.handleCheck} type="checkbox" checked={category.isChecked} value={category.value} /> {category.value}
        </React.Fragment>
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