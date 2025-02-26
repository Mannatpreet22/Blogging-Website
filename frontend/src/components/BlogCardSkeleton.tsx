export const BlogCardSkeleton = () => {
    return <div className="flex items-center justify-center">
    <div className="flex flex-col justify-center items-left m-10 w-1/2 cursor-pointer">
                <div className="flex justify-left items-center">
                    <svg className="w-8 h-8 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
                    <div className="pl-2 text-slate-400">
                    <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
                    </div>
                </div>
                <div className="text-xl font-bold pt-5">
                <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
                </div>
                <div>
                <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
                </div>
                <div className="w-full flex justify-end items-center pr-3 font-semibold text-xs">
                <div className="h-2.5 bg-gray-300 rounded-full"></div>
                </div>
                <div>
                    <hr className="w-full h-px border-0 rounded md:my-10"></hr>
                </div>
            </div>
        </div>
}
