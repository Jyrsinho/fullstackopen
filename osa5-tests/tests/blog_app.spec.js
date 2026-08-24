const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

const testBlog1 = {
    title: 'First Blog',
    author: 'First Author',
    url: 'firsturl.com'
}

const testBlog2 = {
    title: 'Second Blog',
    author: 'Second Author',
    url: 'secondurl.com'
}

const testBlog3 = {
    title: 'Third Blog',
    author: 'Third Author',
    url: 'thirdurl.com'
}

const testUserWithBlog = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
}

const testUserWithoutBlog = {
    name: 'Test User',
    username: 'testuser',
    password: 'salainen'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {data: testUserWithBlog})
        await request.post('api/users',{data: testUserWithoutBlog})
        await page.goto('/')
    })
    test('Login link is shown', async ({ page }) => {
        await expect(page.getByRole('link', {name: 'login'})).toBeVisible()
    })
    describe('Login',() => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, testUserWithBlog.username, testUserWithBlog.password)
            await expect(page.getByText(`${testUserWithBlog.name} logged in`)).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, testUserWithBlog.username, 'wrong')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, testUserWithBlog.username, testUserWithBlog.password)
            await createBlog(page, testBlog1)
        })

        test('a new blog can be created', async ({ page }) => {
            const blogs = page.locator('.blog-link')
            await expect(blogs).toHaveCount(1)
            console.log(blogs);
            await expect(blogs.first()).toContainText(`${testBlog1.title} by ${testBlog1.author}`)
        })
        test('blog can be removed', async ({ page }) => {
            await page.getByRole('button', { name: 'Show' }).click()
            page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`)
                dialog.accept()
            });
            await page.getByRole('button', { name: 'Remove' }).click()
            const blogs = page.locator('.blog-link')
            const messageDiv = page.locator('.status-message-container')

            await expect(messageDiv).toContainText(`Removed blog ${testBlog1.title} by ${testBlog1.author}`)
            await expect(blogs).toHaveCount(0);

        })
        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', {name: 'show'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })
        //Tee testi, joka varmistaa, että vain blogin lisännyt käyttäjä näkee blogin poistonapin.
        test('user sees the removal button for blog he added', async ({ page }) => {
            await page.getByRole('button', { name: 'Show' }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
        })
        test('user does not see removal button for blog he did not add', async ({ page }) => {
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, testUserWithoutBlog.username, testUserWithoutBlog.password )
            await page.getByRole('button', { name: 'Show' }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
        })
        test('blogs are sorted in descending order based on the amount of likes', async ({ page }) => {
            await createBlog(page, testBlog2)
            await createBlog(page, testBlog3)

            const firstBlog = page.locator('.blogContainer').filter({hasText: testBlog1.title})
            const secondBlog = page.locator('.blogContainer').filter({hasText: testBlog2.title})
            const thirdBlog = page.locator('.blogContainer').filter({hasText: testBlog3.title})

            await firstBlog.getByRole('button', { name: 'Show' }).click()
            await secondBlog.getByRole('button', { name: 'Show' }).click()
            await secondBlog.getByRole('button', { name: 'like' }).click()
            await thirdBlog.getByRole('button', { name: 'Show' }).click()
            await thirdBlog.getByRole('button', { name: 'like' }).click()
            await expect(thirdBlog).toContainText('likes: 1')
            await thirdBlog.getByRole('button', { name: 'like' }).click()
            await expect(thirdBlog).toContainText('likes: 2')

            const likedBlogs = page.locator('.blogContainer')
            await expect(likedBlogs.first()).toContainText(testBlog3.title)
            await expect(likedBlogs.nth(1)).toContainText(testBlog2.title)
            await expect(likedBlogs.nth(2)).toContainText(testBlog1.title)
        })
    })
})