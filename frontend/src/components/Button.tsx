export const Button = ({text} : {text : string})=>{
    return <div className="w-3/4 mt-5 pl-2">
        <button className="bg-black text-white w-full p-3 rounded-md">{text}</button>
    </div>
}