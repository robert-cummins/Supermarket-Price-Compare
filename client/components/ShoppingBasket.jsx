import React from 'react'
import { connect } from 'react-redux'
import { editSelectedItems, removeSelectedItem } from '../actions'



class ShoppingBasket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0
        }

    }

    changeValue = (e) => {
        this.setState({
            [e.target.name + e.target.getAttribute('price')]: e.target.value
        })
        
    }

    handleClick = (e) => {
        this.props.dispatch(editSelectedItems(e.target.name, e.target.getAttribute('price'), this.state[e.target.name + e.target.getAttribute('price')]))
    }

    handleDelete = (e) => {
        this.props.dispatch(removeSelectedItem(e.target.name, e.target.getAttribute('price')))
    }

    render() {
        if (this.props.selectedItems.length != 0) {
            let total = 0
            return (
                <table className="ui selectable celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.selectedItems.map((item, i) => {
                            let multiplyer
                            if (this.props.supermarket == item.supermarket) {
                                if (item.numOf == 0 || item.numOf == 1) { multiplyer = '1' }
                                else { multiplyer = item.numOf }

                                let num = parseFloat(item.price) * parseFloat(multiplyer)

                                total = num + total
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{'$' + item.price} <br />{item.type}</td>
                                        <td>{'$' + num.toFixed(2)}</td>
                                        <td>
                                            <input price={item.price} className="num-input" name={item.name} type="number" value={this.state[item.name + item.price] ? this.state[item.name + item.price] : item.numOf} onChange={(e) => this.changeValue(e, item.supermarket)} />
                                            <button price={item.price} onClick={(e) => this.handleClick(e)} name={item.name} className="ui primary basic tiny button">Edit Amount</button>
                                            <button price={item.price} onClick={(e) => this.handleDelete(e)} name={item.name} className="ui negative basic tiny button">Remove Item</button>
                                        </td>
                                    </tr>
                                )
                            }

                        })}
                        <tr>
                            <td><h4>Total:</h4></td>
                            <td></td>
                            <td><h4>{'$' + total.toFixed(2)}</h4></td>
                        </tr>

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
        selectedItems: state.selectedItems
    }
}

export default connect(mapStateToProps)(ShoppingBasket)


