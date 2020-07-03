import React from 'react'
import { connect } from 'react-redux'
import ItemCard from './ItemCard'
import { Grid } from 'semantic-ui-react'


class SearchResults extends React.Component {
    render() {
        return (
            
            <div className="table-container">
                <Grid stackable centered columns={3} divided>
                    <Grid.Row>
                        {this.props.searchedNewWorldItems && !!this.props.searchedNewWorldItems.length &&
                            <Grid.Column>
                                <h2 className="market-headers newworld">NEW WORLD</h2>
                                <ItemCard supermarket={'searchedNewWorldItems'} />
                            </Grid.Column>
                        }

                        {this.props.searchedCountdownItems && !!this.props.searchedCountdownItems.length &&
                            <Grid.Column>
                                <h2 className="market-headers countdown">Countdown</h2>
                                <ItemCard supermarket={'searchedCountdownItems'} />
                            </Grid.Column>
                        }

                        {this.props.searchedPakSaveItems && !!this.props.searchedPakSaveItems.length &&
                            <Grid.Column>
                                <h2 className="market-headers paknsave">PAK'nSAVE</h2>
                                <ItemCard supermarket={'searchedPakSaveItems'} />
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems,
    }
}

export default connect(mapStateToProps)(SearchResults)