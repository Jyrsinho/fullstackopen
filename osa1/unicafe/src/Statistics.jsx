import StatisticsTable from "./StatisticsTable.jsx";

const Statistics = ({ feedback }) => {
    const hasFeedback = !(feedback.all === 0)

    return (
        <>
           { hasFeedback
               ? <StatisticsTable feedback={feedback} />
               : <p>No feedback given</p>
           }
        </>
    )
}

export default Statistics;