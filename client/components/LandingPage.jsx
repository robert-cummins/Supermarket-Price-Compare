import React from 'react'
import { connect } from 'react-redux'
import { fetchNewWorldData, fetchCountdownData, fetchPakSaveData, getSearchedCountdownItems } from '../actions/index'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.dispatch(fetchNewWorldData())
        this.props.dispatch(fetchCountdownData())
        this.props.dispatch(fetchPakSaveData())
    }



    render() {
        return (
            <>
                <div className="ui container">
                    <h1 className="ui center aligned header">Super Market Price Compare</h1>
                    <SearchBar />
                </div>

                <div class="ui three column doubling stackable grid container">
                    <div class="column"><SearchResults supermarket={'searchedNewWorldItems'} /></div>
                    <div class="column"><SearchResults supermarket={'searchedCountdownItems'} /></div>
                    <div class="column"><SearchResults supermarket={'searchedPakSaveItems'} /></div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newWorld: state.newWorld,
        countdown: state.countdown,
        pakSave: state.pakSave,
        searchNewWorldItems: state.searchNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.searchedPakSaveItems
    }
}

export default connect(mapStateToProps)(LandingPage)