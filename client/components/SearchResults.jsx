import React from 'react'
import { connect } from 'react-redux'
import { getSelectedItems } from '../actions'


class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems: []
        }
    }

    changeValue = (e, supermarket) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e, item) => {
        let num
        if (this.state[e.target.name]) {
            num = this.state[e.target.name]
        } else {
            num = '0'
        }
        this.props.dispatch(getSelectedItems(item, num))
    }


    render() {
        if (this.props[this.props.supermarket].length != 0) {
            return (
                <table key={this.props.categorys} className="ui selectable celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Sold by</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props[this.props.supermarket].map((item, i) => {
                            
                            return this.props.categorys.map(category => {

                                if (item.category == category.value && category.isChecked == true) {
                                    
                                    
                                    if (item.type == 'kg') { item.type = '/ kg' }
                                    else if (item.type == 'ea' && item.weight != 'N/A') { item.type = 'Each @ ' + item.weight }
                                    else { item.type = "Each" }
                                    return (
                                        <React.Fragment key={i}>
                                            <tr name={item.name}>
                                                <td name={item.name}>{item.name}</td>
                                                <td>{'$' + item.price}</td>
                                                <td>{item.type}</td>
                                                <td>
                                                    <input className="num-input" name={item.name} type="number" value={this.state[item.name] ? this.state[item.name] : item.numOf} onChange={(e) => this.changeValue(e, item.supermarket)} />
                                                    <button onClick={(e) => this.handleClick(e, item)} name={item.name} className="ui primary basic tiny button">Add Item</button>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                }
                            })


                        })}

                    </tbody>
                </table>
            )
        } else {
            return <div></div>
        }
    }


}


const mapStateToProps = (state) => {
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems,
        categorys: state.categorys
    }
}

export default connect(mapStateToProps)(SearchResults)


