const Statistics = ({good, neutral, bad}) => {
    if (good === null || neutral === null || bad === null) {
        console.log('invalid props in Statistics');
        return null;
    }

    return (
       <>
           <p>good: {good}</p>
           <p>neutral: {neutral}</p>
           <p>bad: {bad}</p>
       </>
    )
}

export default Statistics;