"use client"
import React from 'react';
import { useRouter } from 'next/navigation'
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { setJwtPayload } from '../actions/validate';

export default function SignInPage() {
    const { user,  authToken, isAuthenticated, awaitingSignatureState } = useDynamicContext();
    const router = useRouter()

    React.useEffect(() => {
        if (user && authToken) {
            router.push('/');
            setJwtPayload(authToken)
        }
    }, [user, router]);

    if (user) return null;

    const paragraphStyle = {
        fontWeight: "bold",
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
                <DynamicWidget />
            </div>
        </div >
    );
}
