import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
    test('renders title', () => {
        const testBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'testurl.com',
            likes: 0,
            user: {
                name: 'Test User',
            }
        }

        render(<Blog blog={testBlog} />)

        const element = screen.getByText('Test Title', {exact: false})
        expect(element).toBeDefined()
    })
})