import Course from "./Course.jsx";
import {courses} from "../constants.js";

const App = () => {

    return (
        <div>
            {courses.map((course) => {
                return <Course key={course.id} course={course}/>
            })}
        </div>
    )
}

export default App