const Total = ({parts}) => {
    const total = parts.reduce((accumulator, current ) => {
        return accumulator + current.exercises
     }, 0);

    return (
        <p><b>Number of exercises {total}</b></p>
    )
}

export default Total