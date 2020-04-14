import React from 'react'
import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newWorldData: [],
            countdownData: [],
            pakSaveData: [],
            searchNewWorld: [],
            searchCountdown: [],
            searchpakSave: []
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
                this.SearchFoodItem('apple')
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

    SearchFoodItem = (item) => {
        const newWorldSearch = this.state.newWorldData.filter(foodItem => {
           return foodItem.name.toLowerCase().includes(item.toLowerCase())
            // return arr.filter(foodItem => {
            //     return foodItem.name.includes(item)
            // })
        })
        console.log(newWorldSearch)
    }

    render() {
        return (
            <>
                <h1>Super Market compare</h1>
            </>
        )
    }
}

export default LandingPage