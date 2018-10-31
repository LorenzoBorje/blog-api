const express = require('express');
const router = express.Router();

const app = express();

const {BlogPosts} = require('./models.js');

BlogPosts.create(
    "Working On My Night Cheese", 
    "What we can learn from the Liz Lemon's work ethic.", 
    "Lorenzo Borje"
); 

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

module.exports = router;