import {useState} from "react";

const Blog = ({ blog }) => {
    const [extended, setExtended, ] = useState(false);
    const buttonText = extended ? "Hide" : "Show";

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
                            <button>like</button>
                        </li>
                        <li>{blog.user.name}</li>
                    </>
                }
            </ul>
        )
}

export default Blog