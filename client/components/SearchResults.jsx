import React from 'react'
import { connect } from 'react-redux'
import { getSelectedItems} from '../actions'

class SearchResults extends React.Component  {
    constructor(props){
        super(props)
        
    }
    
    render(){
        if (this.props[this.props.supermarket].length != 0) {
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
                        {this.props[this.props.supermarket].map((item, i) => {
                            if (item.type == 'kg') { item.type = '/ kg' }
                            else if(item.type == 'ea' && item.weight != 'N/A'){item.type = 'Each @ ' + item.weight}
                            else { item.type = "Each"}
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{'$'+ item.price}</td>
                                    <td>{item.type}</td>
                                    <td><button onClick={() => this.props.dispatch(getSelectedItems(item))}  name={item.name} className="ui primary basic tiny button">Add Item</button></td>
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
    

}


const mapStateToProps = (state) => {
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems
    }
}

export default connect(mapStateToProps)(SearchResults)


