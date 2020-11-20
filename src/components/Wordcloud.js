import React, { memo } from 'react';
import ReactWordcloud from 'react-wordcloud';


const Wordcloud = memo(props => {
    return props.status ? <div className="word-cloud">
        <ReactWordcloud words={props.words} options={{
            fontSizes: [18, 72]
        }} />
    </div> : null
})

export default Wordcloud;