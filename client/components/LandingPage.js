import React from 'react'
import {getNewWorldData} from '../api/superMarkets'

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
                console.log(res)
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