
import {
    _saveQuestion,
    _saveQuestionAnswer,
  } from './_DATA.js'

describe('_DATA.js', () => {
    it('test case passed when correctly formatted data is passed to the function _saveQuestion', async() => {
        var question = {optionOneText : 'optionOneText',
                        optionTwoText : 'optionTwoText',
                        author : 'author',}
        
        var result = await _saveQuestion(question);
        expect(result.optionOne.text).toEqual(question.optionOneText);
        expect(result.optionTwo.text).toEqual(question.optionTwoText);
        expect(result.author).toEqual(question.author);
    });

    it('failed when incorrect data is passed to the function _saveQuestion', async() => {

        var invalidQuestion = {optionOneText : '',
                        optionTwoText : 'optionTwoText',
                        author : 'author',}
        
        await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
                            "Please provide optionOneText, optionTwoText, and author"
                        );

    });


    it('will return true when correctly formatted data is passed to the function', async() => {
        var questionAnswer = {
                        authedUser: 'sarahedo',
                        qid : '8xf0y6ziyjabvozdd253nd',
                        answer : 'optionOne',}
        
        var validResult = await _saveQuestionAnswer(questionAnswer);
        expect(validResult).toEqual(true);
    });


    it('will return an error if incorrect data is passed to the function', async() => {
        var invalidQuestionAnswer = {
                        authedUser: '',
                        qid : '8xf0y6ziyjabvozdd253nd',
                        answer : 'optionOne',}
        
        await expect(_saveQuestionAnswer(invalidQuestionAnswer)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
 

});