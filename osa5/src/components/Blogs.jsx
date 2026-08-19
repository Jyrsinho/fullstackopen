import Blog from './Blog.jsx'

const Blogs = ({ loggedUser, blogs, addALike, removeBlog }) => {
    //Lajitellaan suuruusjärjestykseen
    blogs.sort((a,b) => b.likes - a.likes)

    return(
        <div>
            <h3>blogs:</h3>
            {blogs.map(blog => {
                return <Blog addedByUser={loggedUser.username === blog.user.username}
                             addALike={addALike}
                             key={blog.id}
                             blog={blog}
                             removeBlog={removeBlog} />  }
            )}
        </div>
    )
}
export default Blogs