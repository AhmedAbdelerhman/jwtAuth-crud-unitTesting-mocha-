const { expect } = require("chai");
const isAuth = require("../middleware/is-auth");
const jwt = require("jsonwebtoken");
const {stub} = require('sinon');

// note you only test your fun not the packages fun like jwt.verify

describe(" middle ware ", function () {
  // group tests
  it(" throw error if there is noe header ", function () {
    const req = {
      get: function (h) {
        return null;
      },
    };
    expect(() => isAuth(req, {}, () => {}).to.throw("Not authenticated.")); // should be written like that pass refrence of function
  });

  it(" throw error if there is not typed well ", function () {
    const req = {
      get: function (h) {
        return "erjkewhrn jkweh r";
      },
    };
    expect(() => isAuth(req, {}, () => {}).to.throw()); // should be written like that pass refrence of function
  });
});

it(" it should generate id after decode token  ", function () {
  const req = {
    get: function (h) {
      return "erjkewhrn jkweh r";
    },
  };
  // const jwt = {
  //     verify: function (h) {
  //       return  {userId:"abc"};
  //     },
  //   };

// we skip (kill)the jwt verify to test if app generate id or not after  jwt.verify it calls stubs
 stub(jwt,"verify")
  jwt.verify.returns(true)
  isAuth(req, {}, () => {});
  expect(req).to.have.property("userId");
  // restore fun
  jwt.verify.restore()
  // expect(() => isAuth(req, {}, () => {}).to.throw()); // should be written like that pass refrence of function
});
