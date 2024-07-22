import { Blog } from "../hooks"
import { Avatar } from "./Avatar"

export const FullBlog = ({blog} : {blog : Blog})=> {
    return <div className="w-screen p-3 flex">
        <div className="w-3/5 p-10 pt-10">
            <div className="text-5xl font-extrabold mb-4">
                {blog.title[0].toUpperCase()+blog.title.slice(1,blog.title.length)}
            </div>
            <div className="p-2 pl-0 text-slate-400">
                Posted on August 24, 2023
            </div>
            <div>
                {blog.content[0].toUpperCase()+blog.content.slice(1,blog.content.length)}
            </div>
        </div>
        <div className="w-1/4 h-full">
            <div className="w-full text-sm pl-6 pt-10 text-slate-600">
                Author
            </div>
            <div className="w-full -5 pl-6 pt-2 flex">
                <div className="flex justify-center items-center">
                    {blog.author.name ? <Avatar name={blog.author.name}></Avatar> : ""}
                </div>
                <div className="w-full pl-2">
                    <div className="text-xl font-bold m flex justify-left">
                        {blog.author.name[0].toUpperCase() + blog.author.name.slice(1, blog.author.name.length) || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500 text-base">
                        Random catch phrase about the author's ability to grab the user's attention
                    </div>
                </div>

            </div>

        </div>
    </div>
}