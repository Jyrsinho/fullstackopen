import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const testBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl.com',
    likes: 0,
    user: {
        name: 'Test User',
    }
}

describe('Blog', () => {
    test('renders title', () => {
        render(<Blog blog={testBlog} />)

        const element = screen.getByText('Test Title', { exact: false })
        expect(element).toBeDefined()
    })
    test('render url, likes and user when show button clicked', async () => {
        render(<Blog blog={testBlog} />)

        const user = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)

        const url = screen.getByText('testurl.com')
        expect(url).toBeDefined()
        const likes  = screen.getByText('likes', { exact: false })
        expect(likes).toBeDefined()
        const blogUser = screen.getByText(testBlog.user.name)
        expect(blogUser).toBeDefined()
        screen.debug()
    })
    test('clicking like button twice calls its event handler twice ', async () => {
        const mockHandler = vi.fn()
        render(<Blog blog={testBlog} addALike={mockHandler} />)

        const user = userEvent.setup()
        const showButton = screen.getByText('Show')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})