import Blog from "./Blog.jsx";

const Blogs = ({user, blogs, addALike, removeBlog}) => {
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes);

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => <Blog user={user} addALike={addALike} key={blog.id} blog={blog} removeBlog={removeBlog} />)}
        </div>
    )
}
export default Blogs;