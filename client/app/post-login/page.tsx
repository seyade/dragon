'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0/client";

const PostLogin = () => {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        console.log("useEffect triggered"); // Debug log

        async function postLogin() {
            console.log("Inside postLogin function"); // Debug log

            try {
                console.log("Making fetch request"); // Debug log
                const response = await fetch('http://127.0.0.1:8000/post_login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "auth_provider_id": user?.sub
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                router.push(`/${data.user_status}`);
            } catch (error) {
                console.error("Error during API call", error);
            }
        }

        postLogin();
    }, [router, user, isLoading]); // Ensuring all dependencies are listed

    return null; // or a loading indicator
};

export default PostLogin;
