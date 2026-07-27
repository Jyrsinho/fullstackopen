import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {LoginForm} from "./LoginForm.jsx";
import loginService from './services/login'
import {ErrorMessage} from "./ErrorMessage.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
    
    const handleLogin = async (e, credentials) => {
        e.preventDefault()
        console.log(credentials)
        console.log('Handling Login')
        try {
            const user = await loginService.login(credentials)
            console.log(user)
            setUser(user)

        }catch(error){
            console.log(error)
            setErrorMessage(error.message)
        }
    }

  return (
    <div>
        <LoginForm onSubmit={handleLogin}/>
        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}

export default App