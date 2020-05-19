import React from 'react'
import { connect } from 'react-redux'
import { fetchNewWorldData, fetchCountdownData, fetchPakSaveData, checkAll, checkNone } from '../actions/index'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import ShoppingBasket from './ShoppingBasket'
import CheckBox from './Checkbox'
import Instructions from './Instructions'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'instructions',
            checked: true
        }
    }



    handleClick = (e) => {
        // if (e.target.name == 'shopping') { this.setState({ activeTab: 'shopping' }) }
        // else { this.setState({ activeTab: 'search' }) }
        this.setState({ activeTab: e.target.name })
        console.log(this.state)
    }

    handleCheck = () => {
        if (this.state.checked === true) {
            this.setState({ checked: false })
            this.props.dispatch(checkNone())
        } else {
            this.setState({ checked: true })
            this.props.dispatch(checkAll())
        }

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
                    <h1 className="main-text">Supermarket Price Compare</h1>
                    <SearchBar />
                </div>

                <div className="ui container">
                    <div className="ui checkbox check-all">
                        <input onChange={this.handleCheck} type="checkbox" checked={this.state.checked} />
                        <label>Check/Uncheck All</label>
                    </div>
                    <CheckBox />
                </div>

                <div id="context1">
                    <div className="ui secondary menu tabs">
                        <a onClick={this.handleClick} name="instructions" className={this.state.activeTab == 'instructions' ? 'item active tab' : 'item tab-hover'} data-tab="second">Instructions</a>
                        <a onClick={this.handleClick} name="search" className={this.state.activeTab == 'search' ? 'item active tab' : 'item tab-hover'} data-tab="first">Search Results</a>
                        <a onClick={this.handleClick} name="shopping" className={this.state.activeTab == 'shopping' ? 'item active tab' : 'item tab-hover'} data-tab="second">Shopping Basket</a>
                    </div>
                </div>
                {this.state.activeTab == 'search' &&
                    <div className="table-container">
                        <div className="ui three column doubling stackable grid">
                            {this.props.searchedNewWorldItems && !!this.props.searchedNewWorldItems.length &&
                                <div className="column">
                                    <h2 className="market-headers newworld">NEW WORLD</h2>
                                    <SearchResults supermarket={'searchedNewWorldItems'} />
                                </div>
                            }

                            {this.props.searchedCountdownItems && !!this.props.searchedCountdownItems.length &&
                                <div className="column">
                                    <h2 className="market-headers countdown">Countdown</h2>
                                    <SearchResults supermarket={'searchedCountdownItems'} />
                                </div>
                            }

                            {this.props.searchedPakSaveItems && !!this.props.searchedPakSaveItems.length &&
                                <div className="column">
                                    <h2 className="market-headers paknsave">PAK'nSAVE</h2>
                                    <SearchResults supermarket={'searchedPakSaveItems'} />
                                </div>
                            }

                        </div>
                    </div>

                }
                {this.state.activeTab == 'shopping' &&
                    <div className="table-container">
                        <div className="ui three column doubling stackable grid">
                            {this.props.selectedItems && !!this.props.selectedItems.length &&
                                <div className="column">
                                    <h2 className="market-headers newworld">NEW WORLD</h2>
                                    <ShoppingBasket supermarket={'NewWorld'} />
                                </div>
                            }
                            {this.props.selectedItems && !!this.props.selectedItems.length &&
                                <div className="column">
                                    <h2 className="market-headers countdown">Countdown</h2>
                                    <ShoppingBasket supermarket={'Countdown'} />
                                </div>
                            }
                            {this.props.selectedItems && !!this.props.selectedItems.length &&
                                <div className="column">
                                    <h2 className="market-headers paknsave">PAK'nSAVE</h2>
                                    <ShoppingBasket supermarket={'PakSave'} />
                                </div>
                            }
                        </div>
                    </div>

                }

                {this.state.activeTab == 'instructions' &&
                    <Instructions />
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
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems,
        selectedItems: state.selectedItems,
        categorys: state.categorys
    }
}

export default connect(mapStateToProps)(LandingPage)