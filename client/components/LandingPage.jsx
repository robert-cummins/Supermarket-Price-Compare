import React from 'react'
import { connect } from 'react-redux'
import { fetchNewWorldData, fetchCountdownData, fetchPakSaveData, checkAll, checkNone, activateInstructionsTab } from '../actions/index'
import SearchBar from './SearchBar'
import ShoppingBasket from './ShoppingBasket'
import CheckBoxes from './Checkboxes'
import Instructions from './Instructions'
import Header from './Header'
import Spinner from './Spinner'
import Tabs from './Tabs'
import SearchResults from './SearchResults'


class LandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            spinner: true,
            checked: true
        }
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
        this.props.dispatch(activateInstructionsTab())
        this.props.dispatch(fetchNewWorldData())
        this.props.dispatch(fetchPakSaveData())
        this.props.dispatch(fetchCountdownData()).then(() => this.setState({ spinner: false }))
    }




    render() {
        return (
            <>
                <div className="ui container">
                    <Header />
                    {this.state.spinner ?
                        <Spinner /> :
                        <SearchBar />
                    }
                </div>

                <div className="ui container">
                    <div className="ui checkbox check-all">
                        <input onChange={this.handleCheck} type="checkbox" checked={this.state.checked} />
                        <label>Check/Uncheck All</label>
                    </div>
                    <CheckBoxes />
                </div>

                <Tabs />

                {this.props.tabs.activeTab == 'search' &&
                    <SearchResults/>
                }
                
                {this.props.tabs.activeTab == 'shopping' &&
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

                {this.props.tabs.activeTab == 'instructions' &&
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
        categorys: state.categorys,
        tabs: state.tabs
    }
}

export default connect(mapStateToProps)(LandingPage)