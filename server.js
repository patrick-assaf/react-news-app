const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

function isvalid(value) {
    return (value !== null && value !== '' && value !== undefined);
}

function dateFormat(date) {
    return date.slice(0, date.search("T"));
}

function getImage(multimedia) {
    for(const image in multimedia) {
        if(multimedia[image].width >= 2000) {
            return multimedia[image].url;
        }
    }
    return "none";
}

function isSectionOrUrl(path) {
    return ( 
        path === "home" || 
        path === "world" || 
        path === "politics" || 
        path === "business" || 
        path === "technology" || 
        path === "sport" || 
        path === "sports"
    );
}

function isSearch(path) {
    return (
        path.slice(0, path.search("-")) === "search"
    );
}

app.get('/:path', (req, res) => {

    const path = req.params.path.replace(/\~/g, "/");
    const source = path.slice(0, path.search("-"));
    let section = '';

    let home_url = '';
    let url = '';
    let default_img = '';

    let obj = [];

    if(source === "guardian") {
        section = path.slice(9);
        home_url = "https://content.guardianapis.com/search?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&section=(sport|business|technology|politics)&show-blocks=all";
        url = section.slice(0, section.search("-"))  === "search" ? 
        "https://content.guardianapis.com/search?q="+section.slice(section.search("-")+1)+"&api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all" :
        "https://content.guardianapis.com/"+section+"?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&show-blocks=all";
        default_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

        ((section === "home") ?
        fetch(home_url) : fetch(url))
        .then(result => result.json())
        .then(data => {
            (isSectionOrUrl(section) || isSearch(section) ? data.response.results
            .filter((article) => {
                if(isvalid(article.blocks.body[0].bodyTextSummary) && isvalid(article.blocks.main)
                && isvalid(article.webTitle) && isvalid(article.webPublicationDate) && isvalid(article.sectionId)
                && isvalid(article.webUrl)) {
                    return true;
                }
                else {
                    return false;
                }
            }) 
            .map((article, index) =>
                obj[index] = 
                {
                    key: `${index}`, 
                    id: `${article.id}`,
                    img: (article.blocks.main.elements[0].assets.length !== 0) ? 
                        `${article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${article.webTitle}`,
                    description: `${article.blocks.body[0].bodyTextSummary}`,
                    date: `${dateFormat(article.webPublicationDate)}`,
                    section: `${article.sectionId}`,
                    url: `${article.webUrl}`
                }
            ) 
            : obj = 
                {
                    id: `${data.response.content.id}`,
                    img: (data.response.content.blocks.main.elements[0].assets.length !== 0) ? 
                        `${data.response.content.blocks.main.elements[0].assets[data.response.content.blocks.main.elements[0].assets.length-1].file}`
                        : default_img,
                    title: `${data.response.content.webTitle}`,
                    description: `${data.response.content.blocks.body[0].bodyTextSummary}`,
                    date: `${dateFormat(data.response.content.webPublicationDate)}`,
                    section: `${data.response.content.sectionId}`,
                    url: `${data.response.content.webUrl}`
                });
            return obj;
        })
        .then(articles => res.json(articles));
    }

    else if(source === "nytimes"){
        section = (path.slice(8) === "sport") ? "sports" : path.slice(8);
        if(section.slice(0, section.search("-"))  === "search") {
            url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+section.slice(section.search("-")+1)+"&api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV";
        }
        else {
            url = isSectionOrUrl(section) ? 
            "https://api.nytimes.com/svc/topstories/v2/"+section+".json?api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV" :
            'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+section+'")&api-key=ncX4WsHBu6ysmDaLZAGYCYfrnVgt4XQV';
        }
        default_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

        if(isSearch(section)) {
            fetch(url)
            .then(result => result.json())
            .then(data => {
                data.response.docs
                .filter((article) => {
                    if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.headline.main)
                    && isvalid(article.pub_date) && isvalid(article.news_desk) && isvalid(article.web_url)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                .map((article, index) =>
                    obj[index] = 
                    {
                        key: `${index}`, 
                        id: `${article.web_url}`,
                        img: (`${getImage(article.multimedia)}` !== "none") ? "https://nyt.com/"+`${getImage(article.multimedia)}` : default_img,
                        title: `${article.headline.main}`,
                        description: `${article.abstract}`,
                        date: `${dateFormat(article.pub_date)}`,
                        section: `${article.news_desk}`,
                        url: `${article.web_url}` 
                    }
                );
                return obj;
            })
            .then(articles => res.json(articles));
        }
        else {
            fetch(url)
            .then(result => result.json())
            .then(data => {
                (isSectionOrUrl(section) ? data.results
                .filter((article) => {
                    if(isvalid(article.abstract) && isvalid(article.multimedia) && isvalid(article.title)
                    && isvalid(article.published_date) && isvalid(article.section) && isvalid(article.url)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                .map((article, index) =>
                    obj[index] = 
                    {
                        key: `${index}`, 
                        id: `${article.url}`, 
                        img: (`${getImage(article.multimedia)}` !== "none") ? `${getImage(article.multimedia)}` : default_img,
                        title: `${article.title}`,
                        description: `${article.abstract}`,
                        date: `${dateFormat(article.published_date)}`,
                        section: `${article.section}`,
                        url: `${article.url}`
                    }
                ) : obj = 
                    {
                        id: `${data.response.docs[0].web_url}`,
                        img: (`${getImage(data.response.docs[0].multimedia)}` !== "none") ? "https://nyt.com/"+`${getImage(data.response.docs[0].multimedia)}` : default_img,
                        title: `${data.response.docs[0].headline.main}`,
                        description: `${data.response.docs[0].abstract}`,
                        date: `${dateFormat(data.response.docs[0].pub_date)}`,
                        section: `${data.response.docs[0].section_name}`,
                        url: `${data.response.docs[0].web_url}` 
                    });
                return obj;
            })
            .then(articles => res.json(articles));
        }
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
