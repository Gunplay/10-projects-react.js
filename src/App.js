import { useState, useNavigate } from 'react'
import StartPage from './components/startPage/StartPage'
import './index.scss'

const questions = [
  {
    title: 'React - це ...?',
    variants: ['бібліотека', 'фреймворк', 'додаток'],
    correct: 0,
  },
  {
    title: 'Компонент - це...',
    variants: [
      'прикладна програма',
      'частина програми або сторінки',
      'те, що я не знаю що таке',
    ],
    correct: 1,
  },
  {
    title: 'Що таке JSX?',
    variants: [
      'Це простий HTML',
      'Це функція',
      'Це той же HTML, але з можливістю виконувати JS-код',
    ],
    correct: 2,
  },
]

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Ви відгадали {correct} відповіді з {questions.length}
      </h2>
      <h2 style={{ color: 'red' }}>
        {correct > 2
          ? 'Ви не новачок у цій справі, ви Майстер'
          : 'Ви новачок, йдіть ще повчіть...'}
      </h2>
      <a href="/">
        <button>Спробувати знову!</button>
      </a>
    </div>
  )
}

function Game({ step, question, onClickVariant }) {
  // const { title, variants, correct } = props.firstObjectQustion

  const percentage = Math.round((step / questions.length) * 100)
  console.log(percentage)

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          // get it use index
          <li onClick={() => onClickVariant(index)} key={variant}>
            {variant}
          </li>
        ))}
      </ul>
    </>
  )
}

function App() {
  const [step, setStep] = useState(0)
  const [correct, setCorrect] = useState(0)
  const question = questions[step]
  const [isChecked, setIsChecked] = useState(true)

  const onClickVariant = (index) => {
    console.log(step, index)
    setStep(step + 1)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }
  }

  const startQuiz = () => {
    setIsChecked(false)
  }
  return (
    <div className="App">
      {isChecked ? (
        <StartPage startQuiz={startQuiz} />
      ) : (
        <div>
          {step !== questions.length ? (
            <Game
              step={step}
              question={question}
              onClickVariant={onClickVariant}
            />
          ) : (
            <Result correct={correct} step={step} setStep={setStep} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
