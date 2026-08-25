const {  expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByText('login').click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByTestId('alert')).toBeVisible()
}

const createBlog = async (page, blog) => {
    await page.getByRole('link', { name: 'new blog' }).click()
    await page.getByLabel('title').fill(blog.title)
    await page.getByLabel('author').fill(blog.author)
    await page.getByLabel('url').fill(blog.url)
    await page.getByRole('button', { name: 'save' }).click()
    await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
}

const likeABlog = async (page, blog) => {
    await page
        .getByRole('link', { name: `${blog.title} by ${blog.author}` })
        .click()

    const likes = page.getByTestId('likes')
    await page.getByRole('button', { name: 'like' }).click()
    await expect(likes).toHaveText(`likes: ${Number(blog.likes) + 1}`)
    await page.getByRole('link', { name: 'blogs' }).click()
}

export { likeABlog, loginWith, createBlog }