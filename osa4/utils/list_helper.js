const totalLikes = (blogs) => {
    const countLikes = (prev, current) => {
        return current.likes + prev
    }
    return blogs.reduce(countLikes, 0)
}

module.exports = { totalLikes }