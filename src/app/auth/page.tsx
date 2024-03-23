import {
    GoogleSignInButton,
} from "../components/authButtons";
import { CredentialsForm } from "../components/credentialsForm";
import { getServerSession } from "next-auth";
import { authConfig } from "../lib/auth"
import { redirect } from "next/navigation";


export default async function SignInPage() {
    const session = await getServerSession(authConfig);
    if (session) return redirect("/");

    const paragraphStyle = {
        fontWeiht: "bold",
        background: '-webkit-linear-gradient(#6863f8 , #F3F863 )',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen py-2">

            <div className="flex flex-col items-center mt-10 p-4 md:p-10 w-full md:w-4/12">
                <p className="flex flex-row justify-center items-center text-center mb-5 text-4xl  italic" style={paragraphStyle}>
                    Create a frame for your event with in just few steps.
                </p>
                <h1 className="mt-6 mb-2 text-2xl md:text-4xl font-bold text-center text-white">Sign In</h1>
                <GoogleSignInButton />
                <span className="text-xl md:text-2xl font-semibold text-white text-center mt-6 mb-4">
                    Or
                </span>
                <CredentialsForm />
            </div>
        </div >
    );
}
