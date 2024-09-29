'use client';
import { useToken } from '@/components/TokenContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState('');
  const [subID, setSubId] = useState('');
  const [scholarAccount, setScholarAccount] = useState('');
  const [experience, setExperience] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [role, setRole] = useState('professor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useToken();
  const [subjects, setSubjects] = useState<any[]>([]);
  const router = useRouter();
  // State variables
  const [universityName, setUniversityName] = useState('');
  const [universityLocation, setUniversityLocation] = useState('');
  const [universityWebsite, setUniversityWebsite] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!role) {
        toast.error('Please select a role.');
        return;
      }

      if (role === 'admin') {
        const res = await axios.post(`${process.env.API_ENDPOINT}/auth/register/admin`, {
          fullName,
          email,
          uniName: universityName,
          uniWebsite: universityWebsite,
          uniLocation: universityLocation,
          password,
          role,
        });

        if (res?.data?.success) {
          document.cookie = `token=${res?.data?.data?.token}; path=/; secure; samesite=strict`;
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(res?.data?.data?.user)
          )}; path=/; secure; samesite=strict`;

          setToken(res?.data?.data?.token);
          toast.success('User Registered Successfully');
          router.push('/');
          return;
        }
      } else {
        const res = await axios.post(`${process.env.API_ENDPOINT}/auth/register/faculty`, {
          fullName: fullName,
          email,
          password,
          _orgId: orgId,
          _subId: subID,
          scholarAccount,
          role,
          experience,
          facultyId,
        });

        if (res?.data?.success) {
          document.cookie = `token=${res?.data?.data?.token}; path=/; secure; samesite=strict`;
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(res?.data?.data?.user)
          )}; path=/; secure; samesite=strict`;

          toast.success('User Registered Successfully');
          setToken(res?.data?.data?.token);
          router.push('/');
          return;
        }
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.post(`${process.env.API_ENDPOINT}/reviews/subject`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Failed to fetch subjects', error);
      }
    };
    fetchSubject();
  }, []);
  return (
    <section className='flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8'>
      <header className='flex flex-col justify-start gap-9'>
        <Image src={'/logo.png'} width={200} height={200} alt='logo' />
        <div>
          <h2 className='text-3xl  text-gray-900 mb-2'>{role == 'admin' ? 'admin' : 'Professor'} Sign Up</h2>
          <h2 className='text-sm  text-gray-700 '>
            Let&apos;s begin a new journey! Please enter your details.
          </h2>
        </div>
      </header>

      <form className='space-y-6' onSubmit={handleSignUp}>
        <div>
          <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
            Select a Role
          </label>

          <select
            id='role'
            name='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300  bg-white p-4 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
            required
          >
            <option value=''>Choose a Role</option>
            <option value='professor'>Professor</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <div className='flex justify-between gap-4'>
          <div>
            <label htmlFor='fullName' className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              id='fullName'
              name='fullName'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete='off'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
            />
          </div>
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Create Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
          />
        </div>

        {role == 'admin' && (
          <div className='flex flex-col gap-6'>
            <hr className='my-2' />
            <div>
              <label htmlFor='universityName' className='block text-sm font-medium text-gray-700'>
                University Name
              </label>
              <input
                id='universityName'
                name='universityName'
                type='text'
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                autoComplete='off'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor='universityLocation' className='block text-sm font-medium text-gray-700'>
                University Location
              </label>
              <input
                id='universityLocation'
                name='universityLocation'
                type='text'
                value={universityLocation}
                onChange={(e) => setUniversityLocation(e.target.value)}
                autoComplete='off'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor='universityWebsite' className='block text-sm font-medium text-gray-700'>
                University Website
              </label>
              <input
                id='universityWebsite'
                name='universityWebsite'
                type='text'
                value={universityWebsite}
                onChange={(e) => setUniversityWebsite(e.target.value)}
                autoComplete='off'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
              />
            </div>
          </div>
        )}

        {role == 'professor' && (
          <>
            <div className='flex justify-between gap-4'>
              <div className='w-full'>
                <label htmlFor='subId' className='block text-sm font-medium text-gray-700'>
                  Your Subject
                </label>
                <select
                  id='subId'
                  name='subId'
                  value={subID}
                  onChange={(e) => setSubId(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
                  required
                >
                  <option value=''>Your Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name} - {subject.code}
                    </option>
                  ))}
                </select>
              </div>

              <div className='w-full'>
                <label htmlFor='experience' className='block text-sm font-medium text-gray-700'>
                  Experience
                </label>
                <input
                  id='experience'
                  name='experience'
                  type='text'
                  value={experience}
                  placeholder='ex: 8 Years'
                  onChange={(e) => setExperience(e.target.value)}
                  autoComplete='off'
                  required
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
                />
              </div>
            </div>
            <div className='w-full'>
              <label htmlFor='scholarAccount' className='block text-sm font-medium text-gray-700'>
                Scholar Account
              </label>
              <input
                id='scholarAccount'
                name='scholarAccount'
                type='text'
                value={scholarAccount}
                onChange={(e) => setScholarAccount(e.target.value)}
                autoComplete='off'
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
              />
            </div>
            <div className='flex justify-between gap-4'>
              <div>
                <label htmlFor='orgId' className='block text-sm font-medium text-gray-700'>
                  Organization ID
                </label>
                <input
                  id='orgId'
                  name='orgId'
                  type='text'
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  autoComplete='off'
                  required
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
                />
              </div>

              <div>
                <label htmlFor='facultyId' className='block text-sm font-medium text-gray-700'>
                  Faculty ID
                </label>
                <input
                  id='facultyId'
                  name='facultyId'
                  type='text'
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  autoComplete='off'
                  required
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B5DCFE] focus:border-[#B5DCFE] sm:text-sm'
                />
              </div>
            </div>
          </>
        )}

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 px-4 bg-[#0179FE]  text-white font-semibold rounded-md shadow-sm hover:bg-[#0166fe]focus:outline-none focus:ring-2 focus:ring-[#0179FE] '
          >
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
        </div>
      </form>

      <div className='mt-4 text-center text-sm text-gray-500'>
        <p>
          Already Registered?{' '}
          <button
            onClick={() => router.push('/sign-in')}
            className='font-semibold text-[#0179FE] hover:text-[#0166fe]'
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;
