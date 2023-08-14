import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
  } from './_DATA.js'

describe('_DATA.js', () => {
    it('success if correctly formatted data is passed to the function _saveQuestion', async() => {
        var optionOneText = 'optionOneText';
        var optionTwoText = 'optionTwoText';
        var author = 'author';
        var result = await _saveQuestion({optionOneText, optionTwoText, author});
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('author');
        expect(result).toHaveProperty('timestamp');
        expect(result).toHaveProperty('optionOne');
        expect(result).toHaveProperty('optionTwo');
        expect(result.optionOne).toHaveProperty('votes');
        expect(result.optionOne).toHaveProperty('text');
        expect(result.optionTwo).toHaveProperty('votes');
        expect(result.optionTwo).toHaveProperty('text');
        expect(result.optionOne.text).toEqual(optionOneText);
        expect(result.optionTwo.text).toEqual(optionTwoText);
        expect(result.author).toEqual(author);
    });

    it('error if incorrect data is passed to the function _saveQuestion', async() => {
        var optionOneText = 'optionOneText';
        var optionTwoText = 'optionTwoText';
        var author = 'author';

        // reference: https://jestjs.io/docs/asynchronous
        await expect(_saveQuestion({optionOneText, optionTwoText})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
        await expect(_saveQuestion({optionOneText, author})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
        await expect(_saveQuestion({optionTwoText, author})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });

    it('success if correctly formatted data is passed to the function _saveQuestionAnswer', async() => {
        var authedUser = 'sarahedo';
        var qid = '8xf0y6ziyjabvozdd253nd';
        var answer = 'optionOne';
        await expect(_saveQuestionAnswer({ authedUser, qid, answer })).resolves.toBe(true);
    });

    it('error if incorrect data is passed to the function _saveQuestionAnswer', async() => {
        var authedUser = 'sarahedo';
        var qid = '8xf0y6ziyjabvozdd253nd';
        var answer = 'optionOne';
        await expect(_saveQuestionAnswer({authedUser, qid})).rejects.toEqual("Please provide authedUser, qid, and answer");
        await expect(_saveQuestionAnswer({authedUser, answer})).rejects.toEqual("Please provide authedUser, qid, and answer");
        await expect(_saveQuestionAnswer({qid, answer})).rejects.toEqual("Please provide authedUser, qid, and answer");
    });

});