import Blog from "./Blog.jsx";

const Blogs = ({blogs}) => {
    console.log(blogs)

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}
export default Blogs;