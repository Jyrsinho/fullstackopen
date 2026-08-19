import { FormInput } from './FormInput.jsx'
import { useState } from 'react'

export function BlogForm({ createBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        createBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form className='blog-form' onSubmit={(e) => onSubmit(e)}>
            <h2>create new</h2>
            <FormInput label={'title'} onChange={setTitle} value={title} />
            <FormInput label={'author'} onChange={setAuthor} value={author} />
            <FormInput label={'url'} onChange={setUrl} value={url} />
            <button type={'submit'}>create new blog</button>
        </form>
    )
}