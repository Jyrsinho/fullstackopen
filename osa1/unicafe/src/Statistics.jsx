const Statistics = ({ feedback }) => {
    if (!feedback) {
        console.log('invalid props in Statistics');
        return null;
    }

    return (
       <>
           {Object.entries(feedback).map(([key, value]) => {
               return <p>{key}: {value}</p>
           })}
       </>
    )
}

export default Statistics;