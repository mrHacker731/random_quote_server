const mongoose = require('mongoose');
const Quote = require("../model/quoteSchema");
const { error, success } = require('../utils/responseRapper');
const User = require("../model/authSchema");

const createQuote = async (req, res) => {
    const { quote, author } = req.body;
    if (!quote || !author) {
        return res.send(error(404, "all fields required"));
    }
    const oldQuote = await Quote.findOne({ quote: quote });
    if (oldQuote) {
        return res.send(error(400, "quote already exists"));
    }
    const newQuote = await Quote.create({
        quote,
        author,
    });

    return res.send(success(201, newQuote));
};

const updateQuote = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const { quote, author } = req.body;

    const findQuote = await Quote.findOne({ _id: id });

    if (!findQuote) {
        return res.send(error(404, "quote not found"));
    }
    if (quote != null && author != null) {
        findQuote.quote = quote;
        findQuote.author = author;
    }
    if (quote != null) {
        findQuote.quote = quote;
    }
    if (author != null) {
        findQuote.author = author;

    }
    findQuote.save();
    return res.send(success(201, findQuote));

};


const getAllQuote = async (req, res) => {
    const quote = await Quote.find();
    if (!quote) {
        return res.send(error(404, "quote not found"));
    }
    return res.send(success(200, quote));
};

// const getRandomQuote = async (req, res) => {
//     const randomDoc = await Quote.aggregate([{ $sample: { size: 1 } }]);
//     return res.send(success(200, randomDoc));
// };


// Keep track of previously generated random quotes
let previousQuotes = [];

const getRandomQuote = async (req, res) => {
  try {
    let randomDoc;
    const count = await Quote.countDocuments();

    // If all quotes have been shown, reset previousQuotes array
    if (previousQuotes.length === count) {
      previousQuotes = [];
    }

    // Generate a random quote that hasn't been shown yet
    do {
      randomDoc = await Quote.aggregate([{ $sample: { size: 1 } }]);
    } while (previousQuotes.includes(randomDoc[0]._id));

    // Add the new random quote to the previousQuotes array
    previousQuotes.push(randomDoc[0]._id);

    // Update the shownId field of the quote document with the new random quote's _id value
    const existingQuote = await Quote.findOne({ shownId: req.id });
    if (existingQuote) {
      await Quote.findOneAndUpdate(
        { _id: randomDoc[0]._id },
        { $addToSet: { shownId: req.id } }
      );
    }

    // Update the quoteList field of the user document with the new random quote's _id value
    const existingUser = await User.findOne({ quoteList: randomDoc[0]._id });
    if (!existingUser) {
      await User.findOneAndUpdate(
        { _id: req.id },
        { $addToSet: { quoteList: randomDoc[0]._id } }
      );
    }

    return res.send(success(200, randomDoc));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};


//get quote by id
const getQuoteById = async (req, res) => {
  const id = req.params.id;

  const quote = await Quote.findOne({_id:id});
  if(!quote){
    return res.send(error(400,"Invalid quote id"));
  }
  return res.send(success(200, quote));
 }
module.exports = { createQuote, updateQuote,getQuoteById, getRandomQuote, getAllQuote };