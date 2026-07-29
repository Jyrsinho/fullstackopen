import Blog from "./Blog.jsx";

const Blogs = ({blogs, addALike}) => {
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes);

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => <Blog addALike={addALike} key={blog.id} blog={blog} />)}
        </div>
    )
}
export default Blogs;