'use client';
import { useToken } from '@/components/TokenContext';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${process.env.API_ENDPOINT}/auth/login`, { email, password });
      if (res?.data?.success) {
        document.cookie = `token=${res?.data?.data?.token}; path=/; secure; samesite=strict`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(res?.data?.data?.user)
        )}; path=/; secure; samesite=strict`;

        toast.success('User Logged In');
        setToken(res?.data?.data?.token);
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      // console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8'>
      <header className='flex flex-col justify-start gap-9'>
        <Image src={'/logo.png'} width={200} height={200} alt='logo' />
        <div>
          <h2 className='text-3xl  text-gray-900 mb-2'>Login</h2>
          <h2 className='text-sm  text-gray-700 '>Welcome back! Please enter your details.</h2>
        </div>
      </header>

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5DCFE]'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5DCFE]'
          />
        </div>

        <div className='flex items-center justify-between'>
          <Link href='/forgetPassword' className='text-sm text-[#0179FE] hover:text-[#0166fe]'>
            Forgot password?
          </Link>
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 px-4 bg-[#0179FE] text-white font-semibold rounded-md shadow-sm  hover:bg-[#0166fe] focus:outline-none focus:ring-2 focus:bg-[#0166fe]'
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>

      <p className='mt-4 text-center text-sm text-gray-500'>
        Not Registered?{' '}
        <a
          onClick={() => router.push('/sign-up')}
          className='font-semibold text-[#0179FE]  hover:text-[#0166fe] cursor-pointer'
        >
          Register Here
        </a>
      </p>
    </section>
  );
};

export default SignInForm;
