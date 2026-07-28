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

    const handleSubmitNewBlog = async (createdBlog) => {
        try {
            const newBlog = await blogService.create(createdBlog)
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


    return (
    <div>
        {!user && <Togglable buttonlabel={'login'}>
                        <LoginForm onSubmit={handleLogin}/>
                    </Togglable>}
        {user && <h2>Blogs</h2>}
        <StatusMessage message={message} setMessage={setMessage} />
        {user && <User user={user} onLogout={handleLogout} />}
        {user && <Togglable buttonlabel={'create new blog'}>
            <BlogForm handleSubmit={handleSubmitNewBlog}/>
        </Togglable>}
        {user && <Blogs blogs={blogs} />}
    </div>
  )
}

export default App