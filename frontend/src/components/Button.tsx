import { MouseEvent } from "react"

interface ButtonType{
    text : string,
    onClick : (c: MouseEvent<HTMLElement>) => void
}

export const Button = ({text,onClick} : ButtonType)=>{
    return <div className="w-3/4 mt-5 pl-2">
        <button className="bg-black text-white w-full p-3 rounded-md" onClick={onClick}>{text}</button>
    </div>
}