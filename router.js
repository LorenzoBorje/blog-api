const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');

BlogPosts.create(
    "Working On My Night Cheese", 
    "What we can learn from the Liz Lemon's work ethic.", 
    "Lorenzo Borje"
); 

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.log(message);
            res.status(400).send(message);
        }
    });

    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(post);
})

module.exports = router;