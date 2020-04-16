import React from 'react'
import { connect } from 'react-redux'
import {fetchNewWorldData, fetchCountdownData, fetchPakSaveData, getSearchedCountdownItems} from '../actions/index'
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
                <h1>Super Market compare</h1>
                <SearchBar/>
                <SearchResults supermarket={'searchedNewWorldItems'}/>
                <SearchResults supermarket={'searchedCountdownItems'}/>
                <SearchResults supermarket={'searchedPakSaveItems'} />
                {/* <SearchBar/>
                {this.state.searchNewWorld && <h1>New World</h1>}
                {this.state.searchNewWorld && this.state.searchNewWorld.map(item => {
                    return (
                        <>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.type}</p>
                            <br />
                        </>
                    )

                })}

                {this.state.searchCountdown && <h1>Countdown</h1>}
                {this.state.searchCountdown && this.state.searchCountdown.map(item => {
                    return (
                        <>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.type}</p>
                            <br />
                        </>
                    )

                })}

                {this.state.searchPakSave && <h1>Pak and Save</h1>}
                {this.state.searchPakSave && this.state.searchPakSave.map(item => {
                    return (
                        <>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.type}</p>
                            <br />
                        </>
                    )

                })} */}
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