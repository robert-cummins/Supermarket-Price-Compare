import React from 'react'

const Instructions = () => {
    return (
        <div className="ui container">
            <p>
                Welcome to Supermarket Price Compare. This app allows you to see exactly how much your shopping list or an individual item will cost at each of New Zealands big supermarket chains. This will allow you to see exactly how much you could save depending on which supermarket you decided to shop at.
            </p>
            <ul>
                <li className="instructions">
                    Search for items on your shopping list, for example "nescafe coffee" using the search bar and hit enter to see the search results from each supermarket. Add the preferred item from each of the 3 supermarket tables displayed after the search.
                </li>
                <li className="instructions">
                    Find the item you want from each of the 3 supermarket tables and add your prefered amount
                </li>
                <li className="instructions">
                    Use the catagory check boxes to narrow large search results.
                </li>
                <li className="instructions">
                    When searching for fresh vegtables, adding the word "produce" before it will narrow search results. So if for example you were looking for fresh carrots, then searching "produce carrots" will narrow the search results
                </li>
                <li className="instructions">
                    Click on the "shopping basket" tab at any time to see the total running cost for each supermarket.
                </li>
                <li className="instructions">
                    This is hosted for free and is a little slow to start up. If you do not receive results from all 3 supermarkets, refresh the page and wait 10 seconds before making a search. This will only be a problem for the first search
                </li>
            </ul>
        </div>
    )
}

export default Instructions