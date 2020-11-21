import React, { useState, useEffect, createContext } from 'react';
import Searchbox from './components/Searchbox.js';
import Wordcloud from './components/Wordcloud.js';
import Drawer from './components/Drawer.js';
import './App.css';

export const AppContext = createContext();

const App = () => {
    const [hashtag, setHashtag] = useState("#");
    const [open, setOpen] = useState(false);
    const [status, setstatus] = useState(false);
    const [words, setWords] = useState([]);

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                setstatus(true);
                fetch('/tweets').then(res => res.json()).then(data => {
                    console.log(data)
                    setWords([data]);
                });
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