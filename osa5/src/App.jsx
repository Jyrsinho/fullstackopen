import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs.js'
import { LoginForm } from './components/LoginForm.jsx'
import Blogs from './components/Blogs.jsx'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import loginService from './services/login.js'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [loggedUser, setLoggedUser] = useState(null)
    const [, setMessage] = useState(null)

    const blogFormRef = useRef(null)
    const padding = { padding: 5 }
    const loginButtonLabel = loggedUser !== null ? 'logout' : 'login'
    const navigate = useNavigate()
    console.log('App loggedUser -', loggedUser)

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
        const user = JSON.parse(localStorage.getItem('loggedUser'))
        if (user) {
            console.log('found user from localStorage')
            setLoggedUser(user)
            blogService.setToken(user.token)
        } else {
            console.log('user not found from localStorage')
        }
    },[])

    const handleLogout = () => {
        console.log('handleLogOut')
        setLoggedUser(null)
        localStorage.removeItem('loggedUser')
    }


    const handleLogin = async (e, credentials) => {
        console.log('handleLogin - credentials' , credentials)
        e.preventDefault()
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setLoggedUser(user)
            navigate('/')
        }catch(error){
            console.log(error)
            setMessage({
                status: 'error',
                message: 'wrong username or password',
            })
        }
    }


    const createBlog = async (createdBlog) => {
        try {
            const response = await blogService.create(createdBlog)
            const newBlog = {
                ...response,
                user: loggedUser
            }
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
        // TODO- täällä täytyy sulkea blogform-komponentti
        blogFormRef.current.toggleVisibility()
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
        const confirm = window.confirm(`Are you sure you want to remove ${blogToRemove.title}?`)
        if (!confirm) return
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


    const resetMessage = () => {
        setMessage(null)
    }

    return (
        <div>
            <div>
                <Link style={padding} to='/'>blogs</Link>
                {loggedUser ?
                    <Link to={'/'} onClick={handleLogout}>logout</Link>
                    : <Link to='/login'>login</Link>
                }
            </div>
            <div>
                <Routes>
                    <Route path='/' element={
                        <Blogs blogs={blogs} addALike={addALike} removeBlog={removeBlog} />
                    } />
                    <Route path='/login' element={
                        <LoginForm loggedUser={loggedUser} handleLogin={handleLogin} handleLogout={handleLogout} />
                    } />
                    <Route path={'/logout'} action={handleLogout} />
                </Routes>
            </div>
        </div>
    )
}

export default App