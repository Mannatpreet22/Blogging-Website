import { useState } from "react"
import { Button } from "../components/Button"
import { Headers } from "../components/Headers"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { Subheading } from "../components/Subheading"
import { SignUp } from '@mannat/medium-commons'
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"



export const SignUpPage = () => {
    const navigate = useNavigate()
    const [signUpInputs, setSignUpInputs] = useState<SignUp>({
        name: '',
        email: '',
        password: ''
    })

    const sendRequest = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInputs)

            const jwt : string = response.data
            localStorage.setItem("jwt", jwt)
            navigate('/blogs')
        }
        catch (e){
            alert('Unable to Signup!')
            console.error("Error during signup request:", e);
        }
    }

    return <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col items-left justify-center">
            <Headers heading="Create an Account"></Headers>
            <Subheading subheading="Already have an account?" link="Signin"></Subheading>
            <div className="pl-20 -mr-14 flex flex-col items-left justify-center">
                <InputBox heading="Username" defaultValue="Enter your username" onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        name: e.target.value
                    })
                }}></InputBox>
                <InputBox heading="Email" defaultValue="Enter your email" onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        email: e.target.value
                    })
                }}></InputBox>
                <InputBox heading="Password" defaultValue="Enter your password" type='password' onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        password: e.target.value
                    })
                }}></InputBox>
                <Button text="Sign In" onClick={sendRequest}></Button>
            </div>
        </div>

        <div className="invisible md:visible">
            <Quote quote="The customer service I received was exceptional. The support team went above
            and beyond to address my concerns." author="Jules Winnfield" title="CEO,Acme Inc"></Quote>
        </div>

    </div>
}