import React from 'react'
import { connect } from 'react-redux'
import { getSearchedNewWorldItems, getSearchedCountdownItems, getSearchedPakSaveItems } from '../actions/index'


class SearchBar extends React.Component {
    state = {
        searchWord: ''
    }

    searchFoodItem = (item, supermarket, marketFunction) => {
        const filter = (text, searchString) => {
            const regexStr = '(?=.*' + searchString.split(/\,|\s/).join(')(?=.*') + ')';
            const searchRegEx = new RegExp(regexStr, 'gi');
            return text.match(searchRegEx) !== null;
        }
        const supermarketSearch = supermarket.filter(foodItem => {
            return filter(foodItem.name.replace(/'/g, ""), item.replace(/'/g, ""))
        })

        return this.props.dispatch(marketFunction(supermarketSearch))
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.searchFoodItem(this.state.searchWord, this.props.newWorld, getSearchedNewWorldItems)
        this.searchFoodItem(this.state.searchWord, this.props.countdown, getSearchedCountdownItems)
        this.searchFoodItem(this.state.searchWord, this.props.pakSave, getSearchedPakSaveItems)
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="field">
                        <label>Item Search</label>
                        <input type="text" value={this.state.searchWord} onChange={(e) => this.setState({ searchWord: e.target.value })}></input>
                        <button onClick={this.onSubmit} className="ui primary large button search-button">
                            Search
                        </button>
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

