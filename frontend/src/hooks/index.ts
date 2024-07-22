import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
    id: string; // or string, depending on your id type
    author: {
        name: string;
    };
    title: string;
    content: string;
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{ // async function cannot be used in useEffect
        axios.get(`${BACKEND_URL}/api/v1/blog/blogs`,{
            headers : {
                auth : localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            setBlogs(response.data.body)
            setLoading(false)
        })
    },[])

    return {
        loading,
        blogs
    }
}

export const useBlog  = ({id}: {id : string})=>{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers : {
                auth : localStorage.getItem('jwt')
            }
        }).then((response)=>{
            setBlog(response.data.getPost)
            setLoading(false)
        })
    },[])

    return { loading,blog }
}