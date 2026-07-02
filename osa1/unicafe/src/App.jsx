import { useState } from 'react'
import Statistics from "./Statistics.jsx";
import {countAverage} from "../../../utilities/utilities.js";
import Button from "./Button.jsx";

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad;
    const average = countAverage({good, neutral, bad});

    const feedback = {
        good,
        neutral,
        bad,
        all,
        average,
    }

    const createClickHandler = (setCount) => {
        return () => setCount(prevState => prevState + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={createClickHandler(setGood) }  text={'good'}></Button>
            <Button onClick={createClickHandler(setNeutral) } text={'neutral'}/>
            <Button onClick={createClickHandler(setBad) } text={'bad'}></Button>
            <h2>statistics</h2>
            <Statistics feedback={feedback}/>
        </div>
    )
}

export default App