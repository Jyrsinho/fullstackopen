import {useState} from "react";

const Blog = ({ blog, addALike, removable }) => {
    const [extended, setExtended, ] = useState(false);
    const buttonText = extended ? "Hide" : "Show";
    console.log('BLOG')
    console.log('blog:', blog)
    console.log('removable- ', removable)

    const toggleExtended = () => {
        setExtended(!extended);
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
                            <button onClick={() =>addALike(blog)}>like</button>
                        </li>
                        <li>{blog.user.name}</li>
                        {removable &&
                            <li>
                               <button onClick={()=> removeBlog(blog)}>remove</button>
                            </li>
                        }
                    </>
                }
            </ul>
        )
}

export default Blog