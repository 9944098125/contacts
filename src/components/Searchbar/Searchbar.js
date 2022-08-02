import React from 'react';
import './Searchbar.css';

export default function Searchbar(props) {
    return (
        <div className="mb-5 ms-5">
            <h2 className="text-success">Contacts</h2>
            <input
              type="text"
              placeholder="search by name"
              onChange={props.onChangeSearchbar}
              className="search-bar"
            />
            <button className="btn btn-danger ms-3" onClick={props.openModal}>
              Add contacts here
            </button>
          </div>
    )
}