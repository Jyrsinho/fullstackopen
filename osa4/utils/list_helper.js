const totalLikes = (blogs) => {
    const countLikes = (prev, current) => {
        return current.likes + prev
    }
    return blogs.reduce(countLikes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    const compareLikes = (prev, current) => {
        if (prev.likes < current.likes) return 1
        if (prev.likes > current.likes) return -1
        if (prev.likes === current.likes) return 0
    }

    const sortedByLikes = blogs.toSorted(compareLikes)

    return sortedByLikes[0]
}

module.exports = { totalLikes, favoriteBlog }