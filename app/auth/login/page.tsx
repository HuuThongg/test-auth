
"use client"
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || "/settings",
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <button
        className="w-full"
        onClick={() => onClick('google')}
      >
        Google
      </button>
      <button
        className="w-full"
        onClick={() => onClick('github')}
      >
        Github
      </button>
    </div>
  )
};

export default LoginPage;
