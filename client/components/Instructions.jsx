import React from 'react'

const Instructions = () => {
    return (
        <div className="ui container">
            <p className="intro">
                Welcome to Supermarket Price Compare. This app allows you to see exactly how much your shopping list or an individual item will cost at New Zealands biggest supermarket chains. 
            </p>
            <ul>
                <li className="instructions">
                    Search for items on your shopping list, for example "nescafe coffee" using the search bar and hit enter or press the search button.
                </li>
                <li className="instructions">
                    Click on the "Search Results" tab to see searched items from each supermarket. Find the item you want from each of the 3 supermarket tables and add your prefered amount
                </li>
                <li className="instructions">
                    Use the category check boxes to narrow large search results.
                </li>
                <li className="instructions">
                    When searching for fresh vegetables, adding the word "produce" before it will narrow search results. So if for example you were looking for fresh carrots, then searching "produce carrots" will narrow the search results
                </li>
                <li className="instructions">
                    Click on the "shopping basket" tab at any time to see the total running cost for each supermarket.
                </li>
            </ul>
        </div>
    )
}

export default Instructions