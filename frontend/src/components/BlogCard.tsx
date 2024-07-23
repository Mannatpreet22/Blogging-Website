import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps {
    title: string,
    content: string,
    date: string,
    name: string,
    id: string
}
export const BlogCard = ({ title, content, date, name,id}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-left m-10 w-3/4 cursor-pointer">
                <div className="flex justify-left items-center">
                    <Avatar name={name}></Avatar>
                    {name}
                    <div className="pl-2 text-slate-400">
                        •{date}
                    </div>
                </div>
                <div className="text-xl font-bold pt-5">
                    {title}
                </div>
                <div>
                    {(content.length > 120) ? (content.slice(0, 120) + '...') : content}
                </div>
                <div className="w-full flex justify-end items-center pr-3 font-semibold text-xs">
                    {Math.ceil(content.length / 50)} min read
                </div>
                <div>
                    <hr className="w-full h-px border-0 rounded md:my-10 dark:bg-slate-300"></hr>
                </div>
            </div>
        </div>
    </Link>

}