const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller", function () {

    before(function(done){ //execute once before all it funcs
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
        })  .then(() => {
            done();
          });

    })

    after(function(done){ //execute once after all it funcs
        User.deleteMany({})
        .then(() => {
          return mongoose.disconnect();
        })
        .then(() => {
          done();
        });
    })



  beforeEach(function() {}); //execute every before all it funcs

  afterEach(function() {}); //execute every after all it funcs


  it("should throw an error with code 500 if accessing the database fails", function (done) {
    //test async code
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

    AuthController.login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
      })
      .then(done, done); // should written like  then(done, done)

    User.findOne.restore();
  });

  it("should send a response with valid user status for a real user", (done) => {

        const req = { userId: "5c0f66b979af55031b34728a" };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };
        AuthController.getUserStatus(req, res, () => {}).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal("I am new!");
        }).then(done, done);;
  });
});
