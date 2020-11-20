const Twitter = require('twitter');
const fs = require('fs');
const yaml = require('js-yaml');


async function main(a,b = 15) {
  try {
    // Initialization of arrays
    var best10 = [];
    var texts = [];
    var wordsArray = [];
    var wordsMap = [];

    // Authentication
    let fileContents = fs.readFileSync('./src/data/conf.yml', 'utf8');
    let conf = yaml.safeLoadAll(fileContents);
    const client = new Twitter({consumer_key: conf[0]['consumer_key'],
    consumer_secret: conf[0]['consumer_secret'],
    access_token_key: conf[0]['access_token_key'],
    access_token_secret: conf[0]['access_token_secret'],
  })

    // Getting results using a as query string and b as number of results
    client.get('search/tweets', {q: a.concat(' lang:en'), result_type:'popular', count:b}, function(error, tweets, response) {  
    
    // Getting tweet datas
    data = tweets['statuses']

    // teking first tweet id and text of all others
    for(i in data){
      if (i <10) {
        best10.push(data[i]["id"]);

      }
      texts.push(data[i]["text"])
      console.log()
    }
    
    // splitting texts, counting number of words and returning them as wordMap
    var stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
    for (i in texts) {
      var words = texts[i].toLowerCase().split(/\W+/).filter(function(token) {
      token = token.toLowerCase();
      return token.length >= 2 && stopwords.indexOf(token) == -1;});
      console.log(words)
      wordsArray = wordsArray.concat(words);
      console.log(wordsArray)
    }
    console.log(texts[0]);
    console.log(texts[1]);

    wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  console.log(wordsMap);

    });
} catch (e) {
    console.log(e);
}  
};


if (require.main === module) {
  main('#ps5',2).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}