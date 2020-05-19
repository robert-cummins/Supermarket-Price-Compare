import React from 'react'

const Instructions = () => {
    return (
        <div className="ui container">
            <ul>
                <li className="instructions">
                    Search for items on your shopping list, for example "nescafe coffee" using the search bar and hit enter to see the search results from each supermarket. Add the preferred item from each of the 3 supermarket tables displayed after the search.
                            </li>
                <li className="instructions">
                    Click on the "shopping basket" tab at any time to see the total running cost for each supermarket.
                            </li>
                <li className="instructions">
                    Use the catagory check boxes to narrow large search results
                            </li>
                <li className="instructions">
                    This is hosted for free and is a little slow to start up. If you do not receive results from all 3 supermarkets, refresh the page and wait 10 seconds before making a search. This will only be a problem for the first search
                            </li>
            </ul>
        </div>
    )
}

export default Instructions