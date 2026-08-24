import { useParams } from 'react-router-dom'

const Blog = ({  blogs, addALike, removeBlog, loggedUser }) => {

    const id = useParams().id
    const blog = blogs.find((blog) => {
        return blog.id === id
    })

    const addedByUser = true


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