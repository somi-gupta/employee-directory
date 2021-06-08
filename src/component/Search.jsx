import React from 'react';

function Search(props){
    return (
        <form>
            <div className="form-group text-center">
            <label htmlFor="searchInput ">Search</label>
            <input 
            type="text" 
            className="form-control input-sm" 
            id="search" 
            aria-describedby="searchHelp" 
            placeholder="Search"
            onChange={props.handleInputChange}
            value={props.value}
            />
            </div>
        </form>
    );
}

export default Search;