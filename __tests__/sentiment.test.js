const aposToLexForm = require("apos-to-lex-form");
const natural = require("natural");
const SpellCorrector = require("spelling-corrector");
const SW = require("stopword");
const analyseHandler = require("../controllers/sentiment.controller");

// Mock request and response objects
const req = {
  body: {
    review: "This is a test review",
  },
};

const res = {
  json: jest.fn().mockReturnValueOnce({ analysis: 0 }),
  status: jest.fn().mockReturnThis(),
};

describe("analyseHandler", () => {
  test("should normalize review", () => {
    const lexedReview = aposToLexForm(req.body.review);
    const casedReview = lexedReview.toLowerCase();
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
    const spellCorrector = new SpellCorrector();
    spellCorrector.loadDictionary();
    tokenizedReview.forEach((word, index) => {
      tokenizedReview[index] = spellCorrector.correct(word);
    });
    const filteredReview = SW.removeStopwords(tokenizedReview);
    expect(filteredReview).toEqual(["test", "review"]);
  });

  test("should return sentiment analysis result", () => {
    analyseHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ analysis: 0 });
  });
});
