import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Searchbox from './components/Searchbox.js';
import Wordcloud from './components/Wordcloud.js';
import Drawer from './components/Drawer.js';
import words from './words.js';

export const AppContext = createContext();

const App = () => {
    const [hashtag, setHashtag] = useState("#");
    const [open, setOpen] = useState(false);
    const [status, setstatus] = useState(false);

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                setstatus(true);
            }
        };
        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);

    }, []);

    return (
        <div className="App">
            <AppContext.Provider value={{ 'hashtag': [hashtag, setHashtag], 'open': [open, setOpen], 'status': [status, setstatus] }}>
                <Searchbox></Searchbox>
                <Wordcloud status={status} words={words}></Wordcloud>
                <Drawer></Drawer>
            </AppContext.Provider>
        </div>
    );
}

export default App;