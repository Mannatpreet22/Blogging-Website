export const Quote = ({quote,author,title} : {quote : string, author : string, title : string})=>{
    return <div className="h-screen bg-slate-200 flex items-center justify-center flex-col">
        <div className="text-4xl font-semibold w-4/6">
            "{quote}"
        </div>
        <div className=" w-full text-center">
            <div className="text-lg font-semibold mt-5 w-1/2">
                {author}
            </div>
            <div className="text-lg font-semibold text-slate-400 w-1/2">
                {title}
            </div>
        </div>
        
    </div>
}