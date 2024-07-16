import { useState } from "react"
import { Button } from "../components/Button"
import { Headers } from "../components/Headers"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { SignIn } from "@mannat/medium-commons"

export const SignInPage = () => {

    const [postInputs, setPostInputs] = useState<SignIn>({
        email: "",
        password: ""
    })

    return <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="w-1/2">
            <Headers heading="Login"></Headers>
            <Subheading link="SignUp" subheading="Don't have an account?"></Subheading>
            <div className="flex flex-col justify-center items-left -mr-20 pl-20">
                <InputBox heading="Email" defaultValue="johndoe@email.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}></InputBox>
                <InputBox heading="Password" defaultValue="Password@123" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}></InputBox>
                <Button text="Sign In"></Button>
            </div>
        </div>
    </div>
}