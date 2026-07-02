import StatisticLine from "./StatisticLine.jsx";

const Statistics = ({ feedback }) => {
    const hasFeedback = !(feedback.all === 0)

    return (
       <>
           { hasFeedback ? Object.entries(feedback).map(([key, value]) => {
               return <StatisticLine key={key} attribute={key} value={value} />
           })
           : <p>No feedback given</p>
           }
       </>
    )
}

export default Statistics;