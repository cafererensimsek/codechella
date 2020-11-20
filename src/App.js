import React, { useState, useEffect } from 'react';
import HashtagInput from './components/HashtagInput.js';
import Search from './components/SearchButton.js';
import Tooltip from "@material-ui/core/Tooltip";
import ReactWordcloud from 'react-wordcloud';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import words from './words.js';
import { Drawer } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';

const App = () => {
    const [hashtag, setHashtag] = useState("#");
    const [open, setOpen] = useState(false);
    const [status, setstatus] = useState(false);

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                document.getElementById('search-button').click();
                setstatus(true);
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
                    title="Enter a hashtag and press enter to search!"
                    placement='left'
                    arrow
                >
                    <HashtagInput value={hashtag} onChange={(e) => setHashtag(e.target.value)} placeholder="Hashtag"></HashtagInput>
                </Tooltip>
                {status ? <button className="see-tweets" onClick={() => setOpen(!open)}>See Tweets</button> : null}
                <Search id='search-button' onClick={() => console.log(hashtag)}></Search>
            </div>
            {status ? <div className="word-cloud">
                <ReactWordcloud words={words} options={{
                    fontSizes: [18, 72]
                }} />
            </div> : null}
            <Drawer
                placement='right'
                show={open}
                backdrop={true}
                onHide={() => setOpen(false)}
            >
                <Drawer.Header>Most Popular Tweets</Drawer.Header>
                <Drawer.Body>
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                    <TwitterTweetEmbed tweetId="933354946111705097" />
                </Drawer.Body>

            </Drawer>
        </div>
    );
}

export default App;