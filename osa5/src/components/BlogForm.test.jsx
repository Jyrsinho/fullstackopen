import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from './BlogForm.jsx'

describe('BlogForm', () => {
    test('calls its callbackfunction with new blog object from user inputs',  async () => {
        const testInput = {
            title: 'test blog title',
            author: 'Test author',
            url: 'testblogurl.com',
        }
        const user = userEvent.setup()
        const createBlogMock = vi.fn()
        render(<BlogForm createBlog={createBlogMock} />)
        const titleInput = screen.getByLabelText('title')
        const authorInput = screen.getByLabelText('author')
        const urlInput = screen.getByLabelText('url')
        const submitButton = screen.getByText('save')

        await user.type(titleInput, testInput.title)
        await user.type(authorInput, testInput.author)
        await user.type(urlInput, testInput.url)
        await user.click(submitButton)

        expect(createBlogMock.mock.calls).toHaveLength(1)
        expect(createBlogMock).toHaveBeenCalledWith(testInput)
    })
})

/*
Tee uuden blogin luomisesta huolehtivalle lomakkeelle testi,
joka varmistaa, että lomake kutsuu propsina saamaansa
takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.
 */