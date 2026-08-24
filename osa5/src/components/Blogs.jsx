import Blog from './Blog.jsx'

const Blogs = ({ blogs, addALike, removeBlog }) => {
    if (!blogs) return null
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes)

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => {
                return <Blog addALike={addALike}
                    key={blog.id}
                    blog={blog}
                    removeBlog={removeBlog} />  }
            )}
        </div>
    )
}
export default Blogs