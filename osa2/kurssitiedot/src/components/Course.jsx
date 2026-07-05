import Part from "./Part.jsx";
import Header from "./Header.jsx";
import Total from "./Total.jsx";

const Course = ({course}) => {

    const parts = course.parts;

    return (
        <div>
            <Header name={course.name}/>
            {parts.map( (part) => {
                return <Part key={part.id} part={part}/>
            })}
            <Total parts={course.parts}></Total>
        </div>
    )
}
export default Course;