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

module.exports = {
    dummy,
    totalLikes
}