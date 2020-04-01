const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/guardian', (req, res) => {

    const articles = [];

    fetch("https://content.guardianapis.com/search?api-key=591a92b9-9797-407f-96ee-41cd7dbb3532&section=(sport|business|technology|politics)&show-blocks=all")
            .then(result => result.json())
            .then(data => articles = {data});

    res.json(articles);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
