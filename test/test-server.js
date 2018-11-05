const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() {
  
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should return blog posts on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ["id", "title", "content", "author", "publishDate"];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it('should add a blog post on POST', function() {
    const newItem = {
      title: "Growing Pains",
      author: "Lorenzo Borje",
      content: "Non eiusmod qui officia commodo aliquip proident nisi tempor veniam."
      }
    return chai.request(app)
      .post('/blog-posts')
      .send(newItem)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(
          Object.assign(newItem, {id: res.body.id, publishDate: res.body.publishDate})
        );
      });
  });
  
  it('should update a blog post on PUT', function() {
    const updateData = {
      title: "A Tale of Two OSes",
      author: "Lorenzo Borje",
      content: "Amet sint ut pariatur magna. Irure nulla aute culpa reprehenderit. Mollit quis commodo irure do ea qui."
    };
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

});

// set up travis and heroku;