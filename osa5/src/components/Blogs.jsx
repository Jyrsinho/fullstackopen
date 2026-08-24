import Blog from './Blog.jsx'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
    if (!blogs) return null
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes)

    return(
        <div>
            <h3>blogs:</h3>
            <ul>
                {blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}}`}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Blogs