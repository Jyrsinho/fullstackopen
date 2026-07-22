const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
    listWithOneBlog,
    initialBlogs,
    listWithTwoFavorites,
    listWithDijkstrasBlogs,
    listWithTwoWriters
} = require("./fixtures/blogFixtures");

describe('totalLikes', () => {
    test('should return zero when no initialBlogs', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
    test('should return the amount of likes of one blog when initialBlogs has one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 7)
    })
    test('should return the sum of likes of two initialBlogs when initialBlogs has two initialBlogs', () => {
        const listWithTwoBlogs = initialBlogs.toSpliced(2);

        const result = listHelper.totalLikes(listWithTwoBlogs)
        assert.strictEqual(result, 12)
    })
    test('should return the sum of likes when multiple initialBlogs', () => {
        const result = listHelper.totalLikes(initialBlogs)
        assert.strictEqual(result, 36)
    })
})
describe('favoriteBlog', () => {
    test('should return null when no initialBlogs', () => {
        const result = listHelper.favoriteBlog([]);
        assert.strictEqual(result, null)
    })
    test('should return only blog when one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        const firstBlog = listWithOneBlog[0]
        assert.deepStrictEqual(result, firstBlog )
    })
    test('test should return the blog with most likes when multiple initialBlogs', () => {
        const result = listHelper.favoriteBlog(initialBlogs)
        const mostLikedBlog = initialBlogs[2]
        assert.deepStrictEqual(result, mostLikedBlog)
    })
    test('should return the first blog with most likes when multiple initialBlogs have most likes', () => {
        const result = listHelper.favoriteBlog(listWithTwoFavorites);
        const mostLikedBlog = listWithTwoFavorites[0]
        assert.deepStrictEqual(result, mostLikedBlog)
    })
})
describe('mostBlogs', () => {
    test('should return null when no initialBlogs', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, null)
    })
    test('should return the first writer when one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the count of writers initialBlogs when one writer with multiple initialBlogs', () => {
        const result = listHelper.mostBlogs(listWithDijkstrasBlogs)
        const expected = {
            author: "Edsger W. Dijkstra",
            blogs: 2
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the name and number of initialBlogs when two authors', () => {
        const result = listHelper.mostBlogs(listWithTwoWriters)
        const expected = {
            author: "Edsger W. Dijkstra",
            blogs: 2
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the name and number of initialBlogs when multiple authors', () => {
        const result = listHelper.mostBlogs(initialBlogs)
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        }
        assert.deepStrictEqual(result, expected)
    })
})
describe('mostLikes', () => {
    test('should return null when no initialBlogs', () => {
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, null)
    })
    test('should return the first writer when one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        const expected = {
            author: "Michael Chan",
            likes: 7
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the writers when one writer in initialBlogs', () => {
        const result = listHelper.mostLikes(listWithDijkstrasBlogs)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the name and number of likes when two authors', () => {
        const result = listHelper.mostLikes(listWithTwoWriters)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        assert.deepStrictEqual(result, expected)
    })
    test('should return the name and number of likes when multiple authors', () => {
        const result = listHelper.mostLikes(initialBlogs);
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        assert.deepStrictEqual(result, expected)
    })
})
