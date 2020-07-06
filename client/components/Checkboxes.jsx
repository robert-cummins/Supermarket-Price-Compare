import React from 'react'
import { connect } from 'react-redux'
import { changeCategorys } from '../actions/categorys'

class Checkboxes extends React.Component {
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
          <div key={category.value} className="ui checkbox category-checkbox">
            <input onChange={this.handleCheck} type="checkbox" checked={category.isChecked} name={category.value} />
            <label style={{color: "white"}}>{category.value}</label>
          </div>
        )
      })

    )
  }
}

const mapStateToProps = (state) => {
  return {
    categorys: state.categorys
  }
}

export default connect(mapStateToProps)(Checkboxes)