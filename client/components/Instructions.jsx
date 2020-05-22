import React from 'react'

const Instructions = () => {
    return (
        <div className="ui container">
            <p className="intro">
                Welcome to Supermarket Price Compare. This app allows you to see exactly how much your shopping list or an individual item will cost at New Zealands biggest supermarket chains. 
            </p>
            <ul>
                <li className="instructions">
                    Search for items on your shopping list, e.g., "nescafe coffee" using the search bar and hit enter or press the search button.
                </li>
                <li className="instructions">
                    Results will be shown for all 3 supermarkets under the "Search Results" tab which will be automatically selected after a search.
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