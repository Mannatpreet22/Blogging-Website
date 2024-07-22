import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Appbar = ()=>{
    return <div className="w-screen h-14 flex justify-between items-center px-4 border-b">
        <Link to={'/blogs'}>
            <div className="font-bold text-xl">
                Blogging-Website
            </div>
        </Link>
        
        <div>
            <Avatar name="Mannat"></Avatar>
        </div>
    </div>
}