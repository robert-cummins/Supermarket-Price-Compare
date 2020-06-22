import React from 'react'
import { connect } from 'react-redux'
import { getSelectedItems } from '../actions/selectedItems'
import { Button } from 'semantic-ui-react'


class SearchTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    changeValue = (e) => {
        this.setState({
            //combine e.target.name and e.target.price to stop items of the same name changing value together
            [e.target.name + e.target.getAttribute('price')]: e.target.value
        })
    }

    handleClick = (e, item) => {
        let num
        if (this.state[e.target.name + e.target.getAttribute('price')]) {
            num = this.state[e.target.name + e.target.getAttribute('price')]
        } else {
            num = '0'
        }
        this.props.dispatch(getSelectedItems(item, num))
    }


    render() {
        
        if (this.props[this.props.supermarket].length != 0) {
            return (
                <table key={this.props.categorys} className="ui selectable celled table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>PRICE</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props[this.props.supermarket].map((item, i) => {
                            
                            return this.props.categorys.map(category => {
                                
                                if (item.category == category.value && category.isChecked == true) {
                                    return (
                                        <React.Fragment key={i}>
                                            <tr name={item.name}>
                                                <td><img className={"product-img"} src={item.picture}></img></td>
                                                <td name={item.name}>{item.name}</td>
                                                <td>{'$' + item.price} <br/>{item.type}</td>
                                                
                                                <td>
                                                    {!item.selected ? 
                                                        <>
                                                        <input price={item.price} className="num-input" name={item.name} type="number" value={this.state[item.name + item.price] ? this.state[item.name + item.price] : item.numOf} onChange={(e) => this.changeValue(e, item.supermarket)} />
                                                        <Button primary size="tiny" className="add-item" price={item.price} onClick={(e) => this.handleClick(e, item)} name={item.name} >Add Item</Button></> :
                                                        
                                                        <p key={item.name} className={"added-text"}>Added to shopping basket</p>
                                                
                                                    }
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                }
                            })


                        })}

                    </tbody>
                </table>
            )
        } else {
            return <div></div>
        }
    }


}


const mapStateToProps = (state) => {
    return {
        searchedNewWorldItems: state.searchedNewWorldItems,
        searchedCountdownItems: state.searchedCountdownItems,
        searchedPakSaveItems: state.serchedPakSaveItems,
        categorys: state.categorys,
        selectedItems: state.selectedItems
    }
}

export default connect(mapStateToProps)(SearchTable)


