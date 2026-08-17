import {useEffect, useState} from 'react'
import blogService from './services/blogs.js'
import {LoginForm} from "./components/LoginForm.jsx";
import loginService from './services/login.js'
import {StatusMessage} from "./components/StatusMessage.jsx";
import Blogs from "./components/Blogs.jsx"
import {User} from "./components/User.jsx";
import {BlogForm} from "./components/BlogForm.jsx";
import {Togglable} from "./components/Togglable.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    
    console.log('Rendering app again')
    console.log('user', user);


    useEffect(() => {
        const fetchBlogs = async () => {
           try {
               const blogs = await blogService.getAll()
               setBlogs(blogs)
           } catch (error) {
               console.log(error)
               setMessage({
                   status: 'error',
                   message: error.message
               })
           }
        }
        fetchBlogs()
    }, [])

    useEffect(() => {
        console.log('fetching user from local storage...')
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        if (user) {
            console.log('found user from localStorage')
            setUser(user)
            blogService.setToken(user.token)
        } else {
            console.log('user not found from localStorage')
        }
    },[])

    const handleLogin = async (e, credentials) => {
        e.preventDefault()
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        }catch(error){
            setMessage({
                status: 'error',
                message: 'wrong username or password',
            })
        }
    }

    const handleLogout = async () => {
        setUser(null)
        localStorage.removeItem('loggedUser')
    }

    // TODO: Täällä pitää saada kirjautuneen käyttäjän id lisättyä blogiin frontissa
    const createBlog = async (createdBlog) => {
        try {
            const newBlog = await blogService.create(createdBlog)
            // TODO täällä newBlogiin täytyy liittää user joka on kirjautunut
            const newBlogs = [...blogs, newBlog]
            setBlogs(newBlogs)
            setMessage({
                status: 'success',
                message:  `Added blog ${newBlog.title} by ${newBlog.author}`,
            })
        }
        catch(error){
            setMessage({
                status: 'error',
                message: error.message,
            })
        }
    }

    const addALike = async (likedBlog) => {
        const blogToSave = {
            ...likedBlog,
            likes: likedBlog.likes + 1
        }
        try {
            const editedBlog = await blogService.put(blogToSave, likedBlog.id)
            const newBlogs = blogs.map( (blog) => {
                return blog.id === likedBlog.id ? editedBlog : blog
            } )
            setBlogs(newBlogs)
        } catch (error) {
            setMessage({
                status: 'error',
                message: error.message,
            })
        }
    }
    
    const removeBlog = async (blogToRemove) => {
        console.log('lets remove', blogToRemove)
        try {
            await blogService.deleteBlog(blogToRemove.id)
            setMessage({
                status: 'success',
                message:  `Removed blog ${blogToRemove.title} by ${blogToRemove.author}`,
            })
            setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        }catch(error){
            setMessage({
                status: 'error',
                message: error.message,
            })
        }
    }

    return (
    <div>
        {!user && <Togglable buttonlabel={'login'}>
                        <LoginForm onSubmit={handleLogin}/>
                    </Togglable>}
        {user && <h2>Blogs</h2>}
        <StatusMessage message={message} setMessage={setMessage} />
        {user && <User user={user} onLogout={handleLogout} />}
        {user && <Togglable buttonlabel={'create new blog'}>
            <BlogForm createBlog={createBlog}/>
        </Togglable>}
        {user && <Blogs user={user} blogs={blogs} addALike={addALike} removeBlog={removeBlog} />}
    </div>
  )
}

export default App