import Part from "./Part.jsx";

const Content = ({parts})=> {
    if (!parts) throw new Error('no content');

    return (
        <>
            { parts.map( (part, index) => {
                return <Part key={index} part={part}/>
            })}
        </>
    )
}

export default Content