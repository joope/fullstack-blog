const dummy = (blogs) => {
    
    
    return 1;
}

const totalLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return 0;
    }
    return blogs.reduce((prev, blog) => {
        return prev + blog.likes;
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, blog, index, array) => {
        if (index === 0 ) return blog;
        return prev.likes < blog.likes ? blog : prev;
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}