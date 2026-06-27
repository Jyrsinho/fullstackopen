const Content = ({ part, exercises }) => {
    if (!part) throw new Error('bad part');
    if (!exercises) throw new Error('bad exercises');
    return (
        <p>{part} {exercises}</p>
    )
}

export default Content