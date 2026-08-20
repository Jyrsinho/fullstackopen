const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

const testBlog = {
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'testblogurl.com'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await page.goto('/')
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
            await createBlog(page, testBlog)
        })

        test('a new blog can be created', async ({ page }) => {
            const blogs = page.locator('.blogContainer')
            await expect(blogs).toHaveCount(1)
            await expect(page.getByRole('listitem')).toContainText(`${testBlog.title} by ${testBlog.author}`)
        })
        test('blog can be removed', async ({ page }) => {
            await page.getByRole('button', { name: 'Show' }).click()
            page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`)
                dialog.accept()
            });
            await page.getByRole('button', { name: 'Remove' }).click()
            const blogs = page.locator('.blogContainer')
            const messageDiv = page.locator('.status-message-container')

            await expect(messageDiv).toContainText(`Removed blog ${testBlog.title} by ${testBlog.author}`)
            await expect(blogs).toHaveCount(0);


        })
        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', {name: 'show'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })
        //Tee testi, joka varmistaa, että vain blogin lisännyt käyttäjä näkee blogin poistonapin.
        test('user sees the removal button for blogs he added', async ({ page }) => {
            await page.getByRole('button', { name: 'Show' }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
        })
        test('user does not see removal button for blogs he did not add', async ({ page }) => {

        })
    })
})