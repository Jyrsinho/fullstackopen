import { useState } from 'react'
import { Button, TextField } from '@mui/material'

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
            <TextField margin={'normal'} name={'title'} label={'title'} onChange={(e) => setTitle(e.target.value)} value={title} />
            <TextField margin={'normal'} label={'author'} onChange={(e) => setAuthor(e.target.value)} value={author} />
            <TextField margin={'normal'} label={'url'} onChange={(e) => setUrl(e.target.value)} value={url} />
            <Button  type={'submit'}>save</Button>
        </form>
    )
}