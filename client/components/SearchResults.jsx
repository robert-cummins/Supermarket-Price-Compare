import React from 'react'
import { connect } from 'react-redux'
import { getSearchedNewWorldItems } from '../actions'

const SearchResults = (props) => {

    console.log(props[props.supermarket])
    if (props[props.supermarket].length != 0) {
        return (
            <table className="ui selectable celled table">
                <tbody>
                    {props[props.supermarket].map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
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
    // console.log(state)
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems
    }
}

export default connect(mapStateToProps)(SearchResults)


