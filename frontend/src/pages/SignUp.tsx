import { useState } from "react"
import { Button } from "../components/Button"
import { Headers } from "../components/Headers"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { Subheading } from "../components/Subheading"
import {SignUp} from '@mannat/medium-commons'

export const SignUpPage = ()=>{
    
    const [signUpInputs,setSignUpInputs] = useState<SignUp>({
        name : '',
        email : '',
        password : ''
    })

    return <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col items-left justify-center">
            <Headers heading="Create an Account"></Headers>
            <Subheading subheading="Already have an account?" link="Signin"></Subheading>
            <div className="pl-20 -mr-14 flex flex-col items-left justify-center">
                <InputBox heading="Username" defaultValue="Enter your username" onChange={(e)=>{
                    setSignUpInputs({
                        ...signUpInputs,
                        name : e.target.value
                    })
                }}></InputBox>
                <InputBox heading="Email" defaultValue="Enter your email" onChange={(e)=>{
                    setSignUpInputs({
                        ...signUpInputs,
                        email : e.target.value
                    })
                }}></InputBox>
                <InputBox heading="Password" defaultValue="Enter your password" onChange={(e)=>{
                    setSignUpInputs({
                        ...signUpInputs,
                        password : e.target.value
                    })
                }}></InputBox>
                <Button text="Sign In"></Button>
            </div>
        </div>

        <div className="invisible md:visible">
            <Quote quote="The customer service I received was exceptional. The support team went above
            and beyond to address my concerns." author="Jules Winnfield" title="CEO,Acme Inc"></Quote>
        </div>

    </div>
}