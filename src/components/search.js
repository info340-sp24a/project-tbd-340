import React, { useState } from "react";
import { Footer } from "./footer";
import { SearchResultsBox } from "./searchResults";
import { ComposeSearch } from "./composeSearch";

export function SearchPage(props) {
    const { currUser } = props
    const [inputtedText, setInputtedText] = useState('')
    const [finalText, setFinalText] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setFinalText(inputtedText);
        setInputtedText('');
    };

    return(
        <div>
            <main className="search">
                <ComposeSearch inputtedText={inputtedText} setInputtedText={setInputtedText} handleSubmit={handleSubmit} />
                <SearchResultsBox inputtedText={finalText} currUser={currUser}/>
            </main>
            <Footer />
        </div>
    )
}