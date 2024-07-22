import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
export const Blogs = ()=>{
    
    const {loading, blogs } = useBlogs()

    if(loading)
    {
        return <div>
            loading...
        </div>
    }

    return <div className="">
        <Appbar></Appbar>
        {blogs.map(blog =>  <BlogCard key={blog.id} id={blog.id} name={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} date="Dec 3, 2023" ></BlogCard> )}

        
        </div>
    
}