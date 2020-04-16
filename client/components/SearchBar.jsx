import React from 'react'
import { connect } from 'react-redux'
import{getSearchedNewWorldItems, getSearchedCountdownItems, getSearchedPakSaveItems} from '../actions/index'


class SearchBar extends React.Component {
    state = {
        searchWord: ''
    }

    searchFoodItem = (item, supermarket, marketFunction) => {
        const supermarketSearch = supermarket.filter(foodItem => {
            return foodItem.name.toLowerCase().includes(item.toLowerCase())

        })
        return this.props.dispatch(marketFunction(supermarketSearch))
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.searchFoodItem(this.state.searchWord, this.props.newWorld, getSearchedNewWorldItems)
        this.searchFoodItem(this.state.searchWord, this.props.countdown, getSearchedCountdownItems)
        this.searchFoodItem(this.state.searchWord, this.props.pakSave, getSearchedPakSaveItems)
    }

    render(){
        return (
        <div className="ui segment">
            <form onSubmit={this.onSubmit} className="ui form">
                <div className="field">
                    <label>Item Search</label>
                    <input type="text" value={this.state.searchWord} onChange={(e) => this.setState({searchWord: e.target.value})}></input>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newWorld: state.newWorld,
        countdown: state.countdown,
        pakSave: state.pakSave
    }
}

export default connect(mapStateToProps)(SearchBar)
