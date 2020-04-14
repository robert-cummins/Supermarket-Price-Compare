import React from 'react'
import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'

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
        getNewWorldData()
            .then(res => {
                this.setState({
                    newWorldData: res
                })
            })
            .then(() => {
                // this.SearchFoodItem('apple', this.state.newWorldData, "SearchNewWorld")
            })
            
        getCountdownData()
            .then(res => {
                this.setState({
                    countdownData: res
                })
            })
            
        getPakSaveData()
            .then(res => {
                this.setState({
                    pakSaveData: res
                })
            })
    }

    searchFoodItem = (item, supermarket, stateArray) => {
        const supermarketSearch = supermarket.filter(foodItem => {
           return foodItem.name.toLowerCase().includes(item.toLowerCase())
        
        })
        this.setState({[stateArray] : supermarketSearch})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.searchFoodItem(this.state.searchWord, this.state.newWorldData, "SearchNewWorld")
        this.searchFoodItem(this.state.searchWord, this.state.countdownData, "searchCountdown")
        this.searchFoodItem(this.state.searchWord, this.state.pakSaveData, "searchPakSave")
    }

    render() {
        return (
            <>
                <h1>Super Market compare</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Item Search</label>
                    <input type="text" value={this.state.searchWord} onChange={(e) => this.setState({searchWord: e.target.value})}></input>
                    <button>submit</button>
                </form>
            </>
        )
    }
}

export default LandingPage