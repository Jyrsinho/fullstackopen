import Blog from "./Blog.jsx";

const Blogs = ({user, blogs, addALike}) => {
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes);

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map( (blog) => {
                return <Blog addALike={addALike}
                             key={blog.id}
                             blog={blog}
                             removable={blog.user = user.id}
                />
            })}
        </div>
    )
}
export default Blogs;