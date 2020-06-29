import React from 'react'
import { connect } from 'react-redux'
import SearchTable from './SearchTable'
import { Grid } from 'semantic-ui-react'


class SearchResults extends React.Component {
    render() {
        return (
            // <div className="table-container">
            //     <div className="ui three column doubling stackable grid">
            //         {this.props.searchedNewWorldItems && !!this.props.searchedNewWorldItems.length &&
            //             <div className="column">
            //                 <h2 className="market-headers newworld">NEW WORLD</h2>
            //                 <SearchTable supermarket={'searchedNewWorldItems'} />
            //             </div>
            //         }

            //         {this.props.searchedCountdownItems && !!this.props.searchedCountdownItems.length &&
            //             <div className="column">
            //                 <h2 className="market-headers countdown">Countdown</h2>
            //                 <SearchTable supermarket={'searchedCountdownItems'} />
            //             </div>
            //         }

            //         {this.props.searchedPakSaveItems && !!this.props.searchedPakSaveItems.length &&
            //             <div className="column">
            //                 <h2 className="market-headers paknsave">PAK'nSAVE</h2>
            //                 <SearchTable supermarket={'searchedPakSaveItems'} />
            //             </div>
            //         }

            //     </div>
            // </div>
            <Grid stackable centered columns={3} divided>
                <Grid.Row>
                    {this.props.searchedNewWorldItems && !!this.props.searchedNewWorldItems.length && 
                        <Grid.Column>
                            <h2 className="market-headers newworld">NEW WORLD</h2>
                            <SearchTable supermarket={'searchedNewWorldItems'} />
                        </Grid.Column>
                    }

                    {this.props.searchedCountdownItems && !!this.props.searchedCountdownItems.length &&
                       <Grid.Column>
                            <h2 className="market-headers countdown">Countdown</h2>
                           <SearchTable supermarket={'searchedCountdownItems'} />
                       </Grid.Column>
                    }

                    {this.props.searchedPakSaveItems && !!this.props.searchedPakSaveItems.length &&
                        <Grid.Column>
                            <h2 className="market-headers paknsave">PAK'nSAVE</h2>
                            <SearchTable supermarket={'searchedPakSaveItems'} />
                        </Grid.Column>
                    }
                </Grid.Row>
            </Grid>
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