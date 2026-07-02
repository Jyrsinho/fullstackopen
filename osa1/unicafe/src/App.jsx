import { useState } from 'react'
import Statistics from "./Statistics.jsx";

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleValueIncrease = (func) => {
        return () => func(prevState => prevState + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={ handleValueIncrease(setGood) } >good</button>
            <button onClick={handleValueIncrease(setNeutral )}>neutral</button>
            <button onClick={handleValueIncrease(setBad) }>bad</button>
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App