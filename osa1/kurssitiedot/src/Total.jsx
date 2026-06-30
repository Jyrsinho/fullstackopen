const Total = ({parts}) => {
    const total = parts.reduce((accumulator, current ) => {
        return accumulator + current.exercises
     }, 0);

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total