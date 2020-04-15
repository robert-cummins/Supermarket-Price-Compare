import React from 'react'
import { connect } from 'react-redux'
import {fetchNewWorldData, fetchCountdownData, fetchPakSaveData} from '../actions/index'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchWord: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchNewWorldData())
        this.props.dispatch(fetchCountdownData())
        this.props.dispatch(fetchPakSaveData())
    }

    searchFoodItem = (item, supermarket, stateArray) => {
        const supermarketSearch = supermarket.filter(foodItem => {
            return foodItem.name.toLowerCase().includes(item.toLowerCase())

        })
        this.setState({ [stateArray]: supermarketSearch })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.searchFoodItem(this.state.searchWord, this.props.newWorld, "searchNewWorld")
        this.searchFoodItem(this.state.searchWord, this.props.countdown, "searchCountdown")
        this.searchFoodItem(this.state.searchWord, this.props.pakSave, "searchPakSave")
    }

    render() {
        return (
            <>
                <h1>Super Market compare</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Item Search</label>
                    <input type="text" value={this.state.searchWord} onChange={(e) => this.setState({ searchWord: e.target.value })}></input>
                    <button>submit</button>
                </form>
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

                })}
            </>
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

export default connect(mapStateToProps)(LandingPage)