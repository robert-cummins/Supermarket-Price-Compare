import React from 'react'
import { connect } from 'react-redux'
import { getSelectedItems } from '../actions'


class SearchResults extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedItems: [],
            value: '0'
        }

    }

    changeValue = (e) => {
        this.setState({ value: e.target.value });
    }

    handleClick = (e) => {
        let name = e.target.getAttribute('name')
        if (this.state.selectedItems.includes(name)) {
            this.setState({ selectedItems: this.state.selectedItems.filter(t => t !== name) })
        }
        else {
            this.setState({ selectedItems: [...this.state.selectedItems, name] })
        }
    }

    render() {
        if (this.props[this.props.supermarket].length != 0) {
            return (
                <table key={1} className="ui selectable celled table">
                    <thead key={2}>
                        <tr key={3}>
                            <th key={4}>Name</th>
                            <th key={5}>Price</th>
                            <th key={6}>Sold by</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props[this.props.supermarket].map((item, i) => {
                            if (item.type == 'kg') { item.type = '/ kg' }
                            else if (item.type == 'ea' && item.weight != 'N/A') { item.type = 'Each @ ' + item.weight }
                            else { item.type = "Each" }
                            return (
                                <React.Fragment key={i}>
                                    <tr name={item.name} onClick={this.handleClick}>
                                        <td name={item.name}>{item.name}</td>
                                        <td>{'$' + item.price}</td>
                                        <td>{item.type}</td>
                                    </tr>
                                    {this.state.selectedItems.includes(item.name) &&
                                        <tr>
                                            <td>
                                                <form className="add-item">
                                                    <label>Enter Amount: </label>
                                                    <input className="num-input" type="number" value={this.state.value} onChange={this.changeValue} />
                                                    <button onClick={() => this.props.dispatch(getSelectedItems(item))} name={item.name} className="ui primary basic tiny button">Add Item</button>
                                                </form>
                                            </td>
                                        </tr>
                                    }
                                </React.Fragment>

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


