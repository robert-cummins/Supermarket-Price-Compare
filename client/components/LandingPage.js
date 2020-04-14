import React from 'react'
import scraper from '../api/superMarkets'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // scraper()
        //     .then(res => {
        //         console.log(res)
        //      })
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