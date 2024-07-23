import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {

    const navigate = useNavigate()
    const [title,setTitle] = useState('')

    const [description,setDescription] = useState('')
    return <div className="h-screen">
        <Appbar></Appbar>
        <div className="p-10 pb-0 mb-0">
            <input type="text" id="large-input" className="focus:outline-none block w-full p-4 text-gray-900 rounded-lg text-base focus:ring-blue-500 focus:border-blue-500" placeholder="Title" onChange={(e)=>{
                setTitle(e.target.value)
            }}></input>
        </div>
        <form className="p-10 pt-0">
            <div className="w-full mb-4 rounded-lg pt-0 mt-0">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                    <textarea id="comment" rows={10} className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:outline-none" placeholder="Tell your story..." required onChange={(e)=>{
                        setDescription(e.target.value)
                    }}></textarea>
                </div>
                <div className="w-full flex items-center justify-end px-3 py-2 pt-10">
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800" onClick={async (e)=>{
                        e.preventDefault()
                        try{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/blog`, {
                                title,
                                content: description
                            }, {
                                headers: {
                                    Auth: localStorage.getItem("jwt")
                                }
                            });
                            if(response)
                            {
                                navigate(`/blog/${response.data.postId}`)
                            }
                        }
                        catch(e)
                        {
                            alert('error!')
                        }
                    }}>
                        Publish Post
                    </button>
                </div>
            </div>
        <p className="ms-auto text-xs text-gray-500">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600">Community Guidelines</a>.</p>
        </form>

    </div>
}