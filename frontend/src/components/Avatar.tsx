export const Avatar = ({name} : {name : string}) => {
    return <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-slate-300 rounded-full dark:bg-slate-600 mr-2">
        <span className="font-medium text-sm text-gray-600 dark:text-gray-200">{name.slice(0, 1).toUpperCase()}</span>
    </div>
}