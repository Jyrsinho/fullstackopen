const Part = ({part}) => {
    if (!part) throw new Error('no content in Part');
    console.log('Part ', part);
    console.log(typeof part);

    return (
        <p>{part.name}: {part.exercises}</p>
    )
}

export default Part