import React from 'react'
import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newWorldData: [],
            countdownData: [],
            pakSaveData: []
        }
    }

    componentDidMount() {
        getNewWorldData()
            .then(res => {
                this.setState({
                    newWorldData: res
                })
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

    render() {
        return (
            <>
                <h1>Super Market compare</h1>
            </>
        )
    }
}

export default LandingPage