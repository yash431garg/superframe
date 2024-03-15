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

    return (
        <div className="w-full flex flex-col items-center  min-h-screen py-2">
            <div className="flex flex-col items-center mt-10 p-10 w-4/12">
                <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
                <GoogleSignInButton />

                <span className="text-2xl font-semibold text-white text-center mt-8">
                    Or
                </span>
                {/* <CredentialsSignInButton /> */}
                <CredentialsForm />
            </div>
        </div>
    );
}