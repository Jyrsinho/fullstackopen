const Part = ({part}) => {
    if (!part) throw new Error('no content in Part');

    return (
        <p>{part.name}: {part.exercises}</p>
    )
}

export default Part