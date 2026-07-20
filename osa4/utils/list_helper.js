const totalLikes = (blogs) => {
    console.log('counting likes')
    console.log(blogs)
    if (blogs.length === 0) return 0
    const countLikes = (prev, current) => {
        console.log(`prev -  ${prev}`)
        console.log(`current ${current}`)
        return current.likes + prev
    }
    const totalLikes = blogs.reduce(countLikes, 0)
    console.log('total likes count', totalLikes);
    return totalLikes
}

module.exports = { totalLikes }