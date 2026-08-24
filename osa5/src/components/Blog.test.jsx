import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blogCreatorUser = {
    username: 'testUser',
    name: 'Test User',
    password: 'testPassword',
}

const blogViewerUser = {
    username: 'blogviewer',
    name: 'BlogViewer',
    password: 'testPassword',
}
const testBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'testurl.com',
    likes: 0,
    user: blogCreatorUser
}

describe('Blog', () => {
    describe('when user not logged in', () => {
        test('renders title', () => {
            render(<Blog blog={testBlog}/>)

            const element = screen.getByText('Test Title', { exact: false })
            expect(element).toBeDefined()
        })
        test('render url, likes and user', async () => {
            render(<Blog blog={testBlog} loggedUser={blogCreatorUser}/>)

            const url = screen.getByText('testurl.com')
            expect(url).toBeDefined()
            const likes = screen.getByText('likes', { exact: false })
            expect(likes).toBeDefined()
            const blogUser = screen.getByText(testBlog.user.name)
            expect(blogUser).toBeDefined()
        })
        test('does not render like button', () => {
            render(<Blog blog={testBlog} loggedUser={null}/>)
            expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
        })
        test('does not render remove button', async () => {
            render(<Blog blog={testBlog} loggedUser={null}/>)
            expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
        })
    })
    describe('when logged in as creator of a blog', () => {
        test('renders removeButton', () => {
            render(<Blog loggedUser={blogCreatorUser} blog={testBlog}/>)

            const removeButton = screen.getByRole('button', { name: 'Remove' })
            expect(removeButton).toBeDefined()
        })
        test('clicking like button twice calls its event handler twice ', async () => {
            const mockHandler = vi.fn()
            const user = userEvent.setup()
            render(<Blog blog={testBlog} loggedUser={blogCreatorUser} addALike={mockHandler}/>)

            const likeButton = screen.getByText('like')
            await user.click(likeButton)
            await user.click(likeButton)

            expect(mockHandler.mock.calls).toHaveLength(2)
        })
    })
    describe('when logged in as viewer of a blog', () => {
        test('renders like button', () => {
            render(<Blog blog={testBlog} loggedUser={blogViewerUser}/>)
            const likeButton = screen.getByRole('button', { name: 'like' })
            expect(likeButton).toBeInTheDocument()
        })
        test('does not render remove button', async () => {
            render(<Blog blog={testBlog} loggedUser={blogViewerUser}/>)
            expect(
                screen.queryByRole('button', { name: 'Remove' })
            ).not.toBeInTheDocument()
        })
    })
})