import React from 'react';

export function ComposeSearch(props) {
    const { inputtedText, setInputtedText, handleSubmit } = props;

    const handleChange = (event) => {
        setInputtedText(event.target.value);
    };

    return (
        <div>
            <form className='search-bar-button' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search"></label>
                    <input
                        type="text"
                        id="search"
                        className="form-control search-bar search-input"
                        placeholder="search for parts..."
                        autoComplete="off"
                        value={inputtedText}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="search-page-button">Search</button>
            </form>
        </div>
    )
}
