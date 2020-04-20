import React from 'react'
import { connect } from 'react-redux'
import { getSearchedNewWorldItems } from '../actions'

const SearchResults = (props) => {

    console.log(props[props.supermarket])
    if (props[props.supermarket].length != 0) {
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Price</th>
                        <th>Weight</th>
                        <th>Sold by</th>
                    </tr>
                </thead>
                <tbody>
                    {props[props.supermarket].map(item => {
                        if(item.type == 'kg'){item.type = '/kg'}
                        else{item.type = "Each"}
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.weight}</td>
                                <td>{item.type}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    } else {
        return <div></div>
    }

}


const mapStateToProps = (state) => {
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems
    }
}

export default connect(mapStateToProps)(SearchResults)


