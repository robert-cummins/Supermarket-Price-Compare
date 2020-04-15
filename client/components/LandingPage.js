import React from 'react'
import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'
import { connect } from 'react-redux'
import {fetchNewWorldData} from '../actions/index'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newWorldData: [],
            countdownData: [],
            pakSaveData: [],
            searchWord: ''
        }
    }

    componentDidMount() {
        // getNewWorldData()
        //     .then(res => {
        //         this.setState({
        //             newWorldData: res
        //         })
        //     })
        //     .then(() => {
        //         // this.SearchFoodItem('apple', this.state.newWorldData, "SearchNewWorld")
        //     })

        // getCountdownData()
        //     .then(res => {
        //         this.setState({
        //             countdownData: res
        //         })
        //     })

        // getPakSaveData()
        //     .then(res => {
        //         this.setState({
        //             pakSaveData: res
        //         })
        //     })
        this.props.dispatch(fetchNewWorldData())
    }

    searchFoodItem = (item, supermarket, stateArray) => {
        const supermarketSearch = supermarket.filter(foodItem => {
            return foodItem.name.toLowerCase().includes(item.toLowerCase())

        })
        this.setState({ [stateArray]: supermarketSearch })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.searchFoodItem(this.state.searchWord, this.state.newWorldData, "searchNewWorld")
        // this.searchFoodItem(this.state.searchWord, this.state.countdownData, "searchCountdown")
        // this.searchFoodItem(this.state.searchWord, this.state.pakSaveData, "searchPakSave")
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
        newWorld: state.newWorld
    }
}

export default connect(mapStateToProps)(LandingPage)