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
    return blogs.reduce((acc, blog, index, array) => {
        if (index === 0 ) return blog;
        return acc.likes < blog.likes ? blog : acc;
    }, {})
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = blogs.reduce((acc, blog) => {
        const authorBlogs = acc[blog.author];
        if (authorBlogs) {
            acc[blog.author] = authorBlogs + 1;
        } else {
            acc[blog.author] = 1;
        }

        if (!acc['mostBlogged'] || acc['mostBlogged'].blogs <= authorBlogs) {
            acc['mostBlogged'] = {
                author: blog.author,
                blogs: acc[blog.author]
            }
        }
        return acc;
    }, {});
    
    return blogsByAuthor['mostBlogged'];
}

const mostLikes = (blogs) => {
    const likesByAuthor = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author] = blog.likes + acc[blog.author];
        } else {
            acc[blog.author] = blog.likes;
        }

        if (!acc['mostLiked'] || acc['mostLiked'].likes <= acc[blog.author]) {
            acc['mostLiked'] = {
                author: blog.author,
                likes: acc[blog.author]
            }
        }
        return acc;
    }, {});
    
    return likesByAuthor['mostLiked'];
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}