'use client';
import { useToken } from '@/components/TokenContext';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AppraisalFormProps {
  user: User;
}

const AppraisalForm = ({ user }: AppraisalFormProps) => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      toast.success('Appraisal Request Sent');
      router.push(`/faculty/${user?._id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      setFullName(user.fullName);
      setFacultyId('2024UCS1700');
    };
  }, [user]);

  return (
    <section className=' flex p-10 rounded-lg w-full max-w-[480px] max-h-[560px] flex-col border self-center gap-5 py-10 md:gap-8'>
      <header className='flex flex-col  gap-4'>
        <h2 className='text-3xl  text-gray-900 mb-2'>Request Appraisal</h2>
        <h2 className='text-sm  text-gray-700 '>
          Admin will review your request & give you a fair appraisal
        </h2>
      </header>

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              id='email'
              name='email'
              autoComplete='email'
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5DCFE]'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Faculty Id
            </label>
            <input
              id='password'
              name='password'
              autoComplete='current-password'
              required
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5DCFE]'
            />
          </div>
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Your Message To Admin
          </label>
          <textarea
            id='password'
            name='password'
            autoComplete='current-password'
            placeholder='Respected Bhatia Sir.... '
            required
            onChange={(e) => setFacultyId(e.target.value)}
            className='mt-1 block w-full h-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5DCFE]'
          />
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 px-4 bg-[#0179FE] text-white font-semibold rounded-md shadow-sm  hover:bg-[#0166fe] focus:outline-none focus:ring-2 focus:bg-[#0166fe]'
          >
            {isSubmitting ? 'Sending Request...' : 'Send Request'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppraisalForm;
