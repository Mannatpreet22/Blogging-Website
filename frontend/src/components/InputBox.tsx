import { ChangeEvent } from "react"

interface labelledInputType {
    heading : string,
    defaultValue : string,
    onChange : (e : ChangeEvent<HTMLInputElement>)=> void,
    type? : string
}

export const InputBox = ({ heading, defaultValue,onChange,type }: labelledInputType) => {
    return <div className="flex flex-col justify-items-start m-1 ml-4 mt-3 pb-2">
        <label htmlFor="" className="font-semibold text-lg pb-2">{heading}</label>
        <div className="">
            <input type={type || 'text'} placeholder={defaultValue} className="border border-gray-200 rounded-md p-2 w-3/4" onChange={onChange}/>
        </div>
    </div>
}