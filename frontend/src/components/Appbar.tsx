import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { PublishButton } from "./PublishButton"


export const Appbar = ()=>{
    return <div className="w-screen h-16 flex justify-between items-center px-4 border-b">
        <Link to={'/blogs'}>
            <div className="font-bold text-xl">
                Blogging-Website
            </div>
        </Link>
        
        <div className="">
        <PublishButton />
            <Avatar name="Mannat" size="h-10 w-10"></Avatar>
        </div>
    </div>
}