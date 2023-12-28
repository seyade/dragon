'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PostLogin = () => {
    const router = useRouter();



    useEffect(() => {
        // Perform your API call and redirection logic here
        router.push('/register');
    }, [router]);

    return null; // or a loading indicator
};
export default PostLogin;