const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

const testBlog = {
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'testblogurl.com'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
    })

    describe('Login',() => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrong')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, testBlog)
            await expect(page.getByRole('listitem')).toContainText(`${testBlog.title} by ${testBlog.author}`)
        })
        test.only('blog can be liked', async ({ page }) => {
            await createBlog(page, testBlog)
            await page.getByRole('button', {name: 'show'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })
    })
})