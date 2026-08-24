
const Blog = ({  blog, addALike, removeBlog, loggedUser }) => {
    console.log('Blog -', blog)
    const addedByUser = loggedUser?.username === blog?.user.username

    if (!blog) return null

    return (
        <ul className="blogContainer">
            <li>
                <h3>{blog.title} by {blog.author}</h3>
            </li>
            <>
                <li>{blog.url}</li>
                <li>likes: {blog.likes}
                    {loggedUser && <button onClick={() => addALike(blog)}>like</button> }
                </li>
                <li>{blog.user.name}</li>
                {addedByUser && <button onClick={() => removeBlog(blog)}>Remove</button> }
            </>
        </ul>
    )
}

export default Blog