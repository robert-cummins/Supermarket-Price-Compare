import React from 'react'
import { connect } from 'react-redux'
import { getSearchedNewWorldItems } from '../actions'

const SearchResults = (props) => {

    const handleClick = (e) => {
        console.log(e.target.getAttribute('name'))
    }

    if (props[props.supermarket].length != 0) {
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Sold by</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props[props.supermarket].map((item, i) => {
                        if (item.type == 'kg') { item.type = '/ kg' }
                        else if(item.type == 'ea' && item.weight != 'N/A'){item.type = 'Each @ ' + item.weight}
                        else { item.type = "Each"}
                        return (
                            <tr name={item.name} onClick={handleClick} key={i}>
                                <td name={item.name}>{item.name}</td>
                                <td name={item.name}>{item.price}</td>
                                
                                <td name={item.name}>{item.type}</td>
                                <td><button class="ui primary basic tiny button">Add Item</button></td>
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


