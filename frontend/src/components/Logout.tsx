import { useNavigate } from "react-router-dom"


export const Logout = ()=>{
    const navigate = useNavigate()
    return <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-5" onClick={()=>{
        localStorage.removeItem('jwt')
        navigate('/signin') 
    }}>Logout</button>
}