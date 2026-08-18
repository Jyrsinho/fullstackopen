import { useState } from 'react'

const Blog = ({ user, blog, addALike, removeBlog }) => {
    const [extended, setExtended, ] = useState(false)
    const buttonText = extended ? 'Hide' : 'Show'
    const addedByUser = user.username === blog.user.username

    console.log('Blog - blog', blog)
    console.log('Blog - user', user)

    const toggleExtended = () => {
        setExtended(!extended)
    }

    return (
        <ul className="blogContainer">
            <li>
                {blog.title} by {blog.author}
                <button onClick={toggleExtended}>{buttonText}</button>
            </li>
            {extended &&
                    <>
                        <li>{blog.url}</li>
                        <li>likes: {blog.likes}
                            <button onClick={() => addALike(blog)}>like</button>
                        </li>
                        <li>{blog.user.name}</li>
                        {addedByUser && <button onClick={() => removeBlog(blog)}>Remove</button> }
                    </>
            }
        </ul>
    )
}

export default Blog