import React from 'react'
import { connect } from 'react-redux'

const SearchResults = (props) => {
    console.log(props)
    if (props.supermarket != [] || props.supermarket != undefined) {
        return (

            <table className="ui selectable celled table">

                <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        )
    } else {
        return <div></div>
    }

}



export default SearchResults