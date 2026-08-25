const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog, likeABlog} = require('./helper')

const testBlog1 = {
    title: 'First Blog',
    author: 'First Author',
    url: 'firsturl.com',
    likes: 0

}

const testBlog2 = {
    title: 'Second Blog',
    author: 'Second Author',
    url: 'secondurl.com',
    likes: 0
}

const testBlog3 = {
    title: 'Third Blog',
    author: 'Third Author',
    url: 'thirdurl.com',
    likes: 0
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
            await page.getByRole('link', {name: `${testBlog1.title} by ${testBlog1.author}` }).click()
            page.once('dialog', dialog => {
                dialog.accept()
            });
            await page.getByRole('button', { name: 'Remove' }).click()
            const messageDiv = page.locator('.status-message-container')
            const blogs = await page.locator('.blog-link')

            await expect(messageDiv).toContainText(`Removed blog ${testBlog1.title} by ${testBlog1.author}`)
            await expect(blogs).toHaveCount(0);

        })
        test('blog can be liked', async ({ page }) => {
            await page.getByRole('link', {name: `${testBlog1.title} by ${testBlog1.author}` }).click()
            await page.getByRole('button', {name: 'like'}).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })
        //Tee testi, joka varmistaa, että vain blogin lisännyt käyttäjä näkee blogin poistonapin.
        test('user sees the removal button for blog he added', async ({ page }) => {
            await page.getByRole('link', {name: `${testBlog1.title} by ${testBlog1.author}` }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
        })
        test('user does not see removal button for blog he did not add', async ({ page }) => {
            await page.getByRole('link', { name: 'logout' }).click()
            await loginWith(page, testUserWithoutBlog.username, testUserWithoutBlog.password )
            await page.getByRole('link', {name: `${testBlog1.title} by ${testBlog1.author}` }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
        })
        test('blogs are sorted in descending order based on the amount of likes', async ({ page }) => {
            await createBlog(page, testBlog2)
            await createBlog(page, testBlog3)

            await likeABlog(page, testBlog2)
            await likeABlog(page, testBlog3)
            await likeABlog(page, testBlog3)

            const likedBlogs = page.locator('.blog-link')
            await expect(likedBlogs.first()).toContainText(testBlog3.title)
            await expect(likedBlogs.nth(1)).toContainText(testBlog2.title)
            await expect(likedBlogs.nth(2)).toContainText(testBlog1.title)
        })
    })
})