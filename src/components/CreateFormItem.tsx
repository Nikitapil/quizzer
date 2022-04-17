import React, { FC } from 'react'
import { WrongAnswer } from './WrongAnswer'

interface ICreateFormItem {
    question: string,
    rightAnswer: string,
    wrongAnswers: string[], 
    index: number,
    onChangeQuestion: (val: string) => void
    onChangeRightAnswer: (val: string) => void
    onAddItem: () => void
    onChangeWrongAnswer: (idx: number, val: string) => void
}

export const CreateFormItem:FC<ICreateFormItem> = ({question, rightAnswer, wrongAnswers, index, onChangeQuestion, onChangeRightAnswer, onChangeWrongAnswer, onAddItem}) => {
  return (
    <fieldset className='question-field'>
        <legend>Question #{index +1}</legend>
        <label htmlFor="question">Question:</label>
        <input id='question' type="text" value={question} onChange={(e) => onChangeQuestion(e.target.value)} />
        <label htmlFor="right-answer">Right Answer:</label>
        <input id='right-answer' type="text" value={rightAnswer} onChange={(e) => onChangeRightAnswer(e.target.value)} />
        {wrongAnswers.map((answ, Windex) => {
            return (
                <WrongAnswer index={Windex} value={wrongAnswers[Windex]} onChangeValue={(val) => onChangeWrongAnswer(Windex, val)} key={Windex}/>
            )
        })}
        {wrongAnswers.length < 4 && <button type='button' className='question-field-add' onClick={onAddItem}>Add Answer</button>}
    </fieldset>
  )
}
