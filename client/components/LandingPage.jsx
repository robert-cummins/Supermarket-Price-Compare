import React from 'react'
import { connect } from 'react-redux'
import { fetchNewWorldData, fetchCountdownData, fetchPakSaveData, getSearchedCountdownItems } from '../actions/index'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import ShoppingBasket from './ShoppingBasket'
import CheckBox from './Checkbox'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'search',
            category: [
                {
                    id: 12345,
                    value: "Fresh food, bakery and chilled",
                    isChecked: false
                },
                {
                    id: 12346,
                    value: "Frozen",
                    isChecked: false
                },
                {
                    id: 12347,
                    value: "Pantry and non perishable",
                    isChecked: false
                },
                {
                    id: 12348,
                    value: "Beer, cider and wine",
                    isChecked: false
                },
                {
                    id: 12349,
                    value: "Personal care",
                    isChecked: false
                },
                {
                    id: 12350,
                    value: "Baby and toddler",
                    isChecked: false
                },
                {
                    id: 12351,
                    value: "Kitchen, dining and household",
                    isChecked: false
                }
            ]
        }
    }

    handleCheck = (e) => {
        let categorys = this.state.category
        categorys.forEach(category => {
           if (category.value === e.target.value)
              category.isChecked =  e.target.checked
        })
        this.setState({category: categorys})
      }

    handleClick = (e) => {
        if (e.target.name == 'shopping') { this.setState({ activeTab: 'shopping' }) }
        else { this.setState({ activeTab: 'search' }) }
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

                <div className="ui container">
                    {
                        this.state.category.map((category) => {
                            return (<CheckBox key={category.id} handleCheck={this.handleCheck}  {...category} />)
                        })
                    }
                </div>

                <div id="context1">
                    <div className="ui secondary menu tabs">
                        <a onClick={this.handleClick} name="search" className={this.state.activeTab == 'search' ? 'item active' : 'item'} data-tab="first">Search</a>
                        <a onClick={this.handleClick} name="shopping" className={this.state.activeTab == 'shopping' ? 'item active' : 'item'} data-tab="second">Shopping Basket</a>
                    </div>
                </div>
                {this.state.activeTab == 'search' &&
                    <div className="table-container">
                        <div className="ui three column doubling stackable grid">
                            <div className="column">
                                <h2 className="market-headers">New World</h2>
                                <SearchResults supermarket={'searchedNewWorldItems'} />
                            </div>

                            <div className="column">
                                <h2 className="market-headers">Countdown</h2>
                                <SearchResults supermarket={'searchedCountdownItems'} />
                            </div>

                            <div className="column">
                                <h2 className="market-headers">Pak and Save</h2>
                                <SearchResults supermarket={'searchedPakSaveItems'} />
                            </div>
                        </div>
                    </div>

                }
                {this.state.activeTab == 'shopping' &&
                    <div className="table-container">
                        <div className="ui three column doubling stackable grid">
                            <div className="column">
                                <h2 className="market-headers">New World</h2>
                                <ShoppingBasket supermarket={'NewWorld'} />
                            </div>

                            <div className="column">
                                <h2 className="market-headers">Countdown</h2>
                                <ShoppingBasket supermarket={'Countdown'} />
                            </div>
                            <div className="column">
                                <h2 className="market-headers">Pak and Save</h2>
                                <ShoppingBasket supermarket={'PakSave'} />
                            </div>
                        </div>
                    </div>

                }
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