import React, { useContext } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Drawer } from 'rsuite';
import { AppContext } from '../App.js';
import 'rsuite/dist/styles/rsuite-default.css';


const TweetDrawer = () => {
    const open = useContext(AppContext)['open'][0];
    const setOpen = useContext(AppContext)['open'][1];

    return <Drawer
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
}

export default TweetDrawer;