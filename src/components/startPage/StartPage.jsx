import React from 'react'
import styles from './StartButton.module.css'

const StartPage = ({startQuiz}) => {
    
  return (
    <div className={styles.startWindow}>
        <h1>Опитування щодо Реакту</h1>
        <h2 style={{marginLeft: "40px"}}>Якщо готовий, натисніть на початок опитування!</h2>
        <button onClick={startQuiz}className={styles.startButton}>Почати</button>
    </div>
  )
}

export default StartPage