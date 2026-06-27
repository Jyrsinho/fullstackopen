const Total = ({exercises}) => {
    const total = exercises.reduce((previous, current) => {
        return previous + current
    })
    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total