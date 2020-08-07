import React from 'react'

const Instructions = () => {
    return (
        <div className="ui container">
            <p className="intro">
                Welcome to Supermarket Saver. This app allows you to see exactly how much an individual item or shopping list will cost at New Zealand's biggest supermarket chains. 
            </p>
            <ul>
                <li className="instructions">
                    Search for items on your shopping list, e.g., "beef mince" using the search bar. Results will be shown for all 3 supermarkets under the "Search Results" tab.
                </li>
                <li className="instructions">
                    If you would like to see the total cost of multiple items at a supermarket, use the "add item" button to keep track.
                </li>
                <li className="instructions">
                    Add the same items at each supermarket if you would like to compare total prices between them.
                </li>
                <li className="instructions">
                    Large search results can be narrowed using the category checkboxes. Being as specific as possible with your search, e.g., searching the brand name as well as the product name or adding the word "produce" when searching for fresh vegatables, e.g., "produce carrots" will also help narrow search results.
                </li>
                <li className="instructions">
                    Click on the "shopping basket" tab at any time to see the total running cost for each supermarket.
                </li>
            </ul>
        </div>
    )
}

export default Instructions