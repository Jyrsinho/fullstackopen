const Statistics = ({ feedback }) => {
    const hasFeedback = !(feedback.all === 0)

    return (
       <>
           { hasFeedback ? Object.entries(feedback).map(([key, value]) => {
               return <p key={`statistic_${key}`}>{key}: {value}</p>
           })
           : <p>No feedback given</p>
           }
       </>
    )
}

export default Statistics;