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

BlogPosts.create(
    "Everything Wrong With Everything Wrong With In 400 Words Or Less", 
    "Film criticism in the age of YouTube", 
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
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id ${req.params.id}`);
    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.log(message);
            res.status(400).send(message);
        }
    });

    if (!(req.params.id === req.body.id)) {
        const message = `Request path id ${req.params.id} must match request body id ${req.body.id}`;
        console.error(message);
        return res.status(400).send(message);
    };

    console.log(`Updating blog post \`${req.params.id}\``);
    BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    res.status(204).end();
  
    
})

module.exports = router;