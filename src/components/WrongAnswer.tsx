import React, { FC } from 'react'

interface WrongAnswerProps {
    index: number
    value: string
    onChangeValue: (e: any) => void
}

export const WrongAnswer:FC<WrongAnswerProps> = ({index, value, onChangeValue}) => {
  return (
    <div>
        <label htmlFor={`wrong-answer_${index}`}>Wrong Answer {index + 1}:</label>
        <input required autoComplete='off' id={`wrong-answer_${index}`} type="text" value={value} onChange={(e) => onChangeValue(e.target.value)} />
    </div>
  )
}
