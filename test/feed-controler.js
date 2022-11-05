const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const User = require("../models/user");
const feedController = require("../controllers/feed");

describe("feed Controller", function () {
  before(function (done) {
    //execute once before all it funcs
    mongoose
      .connect(
        "mongodb+srv://ahmed:ahmed01091749487@cluster0.1z1lg.mongodb.net/test?retryWrites=true&w=majority"
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "test",
          name: "name",
          posts: [],
          _id: "5c0f66b979af55031b34728a", //set our user id
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  after(function (done) {
    //execute once after all it funcs
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function () {}); //execute every before all it funcs

  afterEach(function () {}); //execute every after all it funcs

  it(" test if user has post after post created", function (done) {
    const req = {
      body: {
        title: "test title",
        content: "test content",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34728a",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };
    feedController
      .createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
      })
      .then(done, done); // should written like  then(done, done)
  });
});
