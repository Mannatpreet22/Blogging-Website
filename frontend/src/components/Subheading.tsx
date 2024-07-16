import { Link } from "react-router-dom"


export const Subheading = ({subheading,link} : {subheading : string, link : string})=>{
    return <div className="m-2 p-2 text-center text-gray-500 pl-0.5">
        <div className="text-lg">
            {subheading}
            <Link to={`/${link}`} className="pl-2 underline">{link}</Link>
        </div>
        
    </div>
}