import React from 'react'
import { connect } from 'react-redux'



class ShoppingBasket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0
        }

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
                            <th>Sold by</th>
                            <th>Total</th>
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
                                if (item.type == 'kg') { item.type = '/ kg' }
                                else if (item.type == 'ea' && item.weight != 'N/A') { item.type = 'Each @ ' + item.weight }
                                else { item.type = "Each" }
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.type}</td>
                                        <td>{'$' + num.toFixed(2)}</td>
                                    </tr>
                                )
                            }

                        })}
                        <tr>
                            <td><h4>Total:</h4></td>
                            <td></td>
                            <td></td>
                            <td><h4>{total.toFixed(2)}</h4></td>
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


