import React from 'react';

class NavSearch extends React.Component{
    constructor(){
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    handleKeyPress(e){
        if(e.key === 'Enter') {
            const {searchTracks} = this.props;
            const value = e.target.value.trim();
            searchTracks({path:'songs', query:{q:value}});
        }
    }
    
    render(){
        return(
            <input type="text"
                   className="nav-search-input"
                   placeholder="SEARCH"
                   onKeyPress={this.handleKeyPress} />
        )
    }
}

export default NavSearch;