export const FullBlogSkeleton = ()=>{
    return <div className="w-screen p-20 flex">
        <div className="w-3/5 p-10 pt-10">
            <div className="text-5xl font-extrabold mb-4">
            <div className="h-2.5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-2 pl-0 text-slate-400">
            <div className="h-2.5 bg-gray-300 rounded-full"></div>
            </div>
            <div>
            <div className="h-2.5 bg-gray-300 rounded-full"></div>
            </div>
        </div>
        <div className="w-1/4 h-full">
            <div className="w-full text-sm pl-6 pt-10 text-slate-600">
                Author
            </div>
            <div className="w-full -5 pl-6 pt-2 flex">
                <div className="flex justify-center items-center">
                <svg className="w-8 h-8 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
                </div>
                <div className="w-full pl-2">
                    <div className="text-xl font-bold m flex justify-left">
                    <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="pt-2 text-slate-500 text-base">
                    <div className="h-2.5 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

            </div>

        </div>
    </div>

}