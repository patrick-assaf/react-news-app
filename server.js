const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

function isvalid(value) {
    return (value !== null && value !== '' && value !== undefined);
}

function cutoff(string) {
    let char = 510;
    if(string.length <= 510) {
        return string;
    }
    else {
        while(string[char] !== ' ' && char < 520) {
            char += 1;
        }
        return string.substring(0, char);
    }
}

function dateFormat(date) {
    return date.slice(0, date.search("T"));
}

app.get('/guardian', (req, res) => {

    const url = "https://content.guardianapis.com/search?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&section=(sport|business|technology|politics)&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

app.get('/guardian-world', (req, res) => {

    const url = "https://content.guardianapis.com/world?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

app.get('/guardian-politics', (req, res) => {

    const url = "https://content.guardianapis.com/politics?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

app.get('/guardian-business', (req, res) => {

    const url = "https://content.guardianapis.com/business?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

app.get('/guardian-technology', (req, res) => {

    const url = "https://content.guardianapis.com/technology?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

app.get('/guardian-sport', (req, res) => {

    const url = "https://content.guardianapis.com/sport?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
    const default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const guardianObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.response.results.filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main.elements[0].assets)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                guardianObj[index] = 
                {
                    key: `${index}`, 
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${cutoff(article.blocks.body[0].bodyTextSummary)}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            )
            return guardianObj;
        })
        .then(articles => res.json(articles));
});

function getImage(multimedia) {
    for(const image in multimedia) {
        if(multimedia[image].width >= 2000) {
            return multimedia[image].url;
        }
    }
    return "none";
}

app.get('/nytimes', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.get('/nytimes-world', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.get('/nytimes-politics', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.get('/nytimes-business', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/business.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.get('/nytimes-technology', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.get('/nytimes-sports', (req, res) => {

    const url = "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
    const default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const nytimesObj = [];

    fetch(url)
        .then(result => result.json())
        .then(data => {
            data.results.filter((article) => {
                if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .map((article, index) =>
                nytimesObj[index] = 
                {
                    key: `${index}`, 
                    img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                    title: `${article.title}`,
                    description: `${cutoff(article.abstract)}`,
                    date: `${dateFormat(article.published_date)}`,
                    section: `${article.section}`,
                    url: `${article.url}`
                }
            )
            return nytimesObj;
        })
        .then(articles => res.json(articles));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
