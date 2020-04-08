import React from 'react'
import scraper from '../api/scraper'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        scraper()
            .then(res => {
                this.setState({
                    data: res
                })
             })
    }

    render() {
        return (
            <>
                <h1>Super Market compare</h1>
                <h2>New World</h2>
                {this.state.data.length > 0 &&
                    this.state.data[0].map(arr => {
                        return arr.map(product => {
                            return (
                                <div>
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                    <p>{product.type}</p>
                                </div>
                            )
                        })
                    })

                }
            </>
        )
    }
}

export default LandingPage