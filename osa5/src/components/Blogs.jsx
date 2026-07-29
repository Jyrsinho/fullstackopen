import Blog from "./Blog.jsx";

const Blogs = ({blogs, addALike}) => {
    console.log(blogs)

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => <Blog addALike={addALike} key={blog.id} blog={blog} />)}
        </div>
    )
}
export default Blogs;