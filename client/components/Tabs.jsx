import React from 'react'
import { connect } from 'react-redux'
import { activateSearchTab, activateShoppingTab, activateInstructionsTab } from '../actions/index'


class Tabs extends React.Component {
    constructor(props) {
        super(props)

    }

    handleClick = (e) => {
        if (e.target.name === 'search') this.props.dispatch(activateSearchTab())
        if (e.target.name === 'shopping') this.props.dispatch(activateShoppingTab())
        if (e.target.name === 'instructions') this.props.dispatch(activateInstructionsTab())
    }

    render() {
        return (
            <div id="context1">
                <div className="ui secondary menu tabs">
                    <a onClick={this.handleClick} name="instructions" className={this.props.tabs.activeTab == 'instructions' ? 'item active tab' : 'item tab-hover'} data-tab="second">Instructions</a>
                    <a onClick={this.handleClick} name="search" className={this.props.tabs.activeTab == 'search' ? 'item active tab' : 'item tab-hover'} data-tab="first">Search Results</a>
                    <a onClick={this.handleClick} name="shopping" className={this.props.tabs.activeTab == 'shopping' ? 'item active tab' : 'item tab-hover'} data-tab="second">Shopping Basket</a>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tabs: state.tabs
    }
}

export default connect(mapStateToProps)(Tabs)