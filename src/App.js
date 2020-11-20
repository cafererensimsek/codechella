import React, { useState, useEffect } from 'react';
import HashtagInput from './components/HashtagInput.js';
import Keyword from './components/Keyword.js';
import Search from './components/SearchButton.js';
import Tooltip from "@material-ui/core/Tooltip";
import ReactWordcloud from 'react-wordcloud';
import words from './words.js';
import './App.css';

const App = () => {
    const [hashtag, setHashtag] = useState("#");

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                document.getElementById('search-button').click();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div className="App">
            <div className="search-box">
                <Tooltip
                    id="tooltip"
                    title="Press enter to search!"
                    placement="top"
                    arrow>
                    <HashtagInput value={hashtag} onChange={(e) => setHashtag(e.target.value)} placeholder="Hashtag"></HashtagInput>
                </Tooltip>
                <Search id='search-button' onClick={() => console.log(hashtag)}></Search>
            </div>
            <div className="keywords">
                <ReactWordcloud words={words} />
            </div>
        </div>
    );
}

export default App;