'use client';
import { useState } from 'react';
import axios from 'axios';

const SubjectForm = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.API_ENDPOINT}/subject/add`, {
        _orgId: '357719f42dda',
        name,
        code,
        description,
      });
      setName('');
      setCode('');
      setDescription('');
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  return (
    <form className='w-[50%] mx-auto md:ml-[500px] pt-10' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='md:w-[50%] border rounded p-2'
          placeholder='Subject name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='code' className='block text-sm font-medium text-gray-700 pt-5'>
          Code
        </label>
        <input
          type='text'
          id='code'
          name='code'
          className='md:w-[50%] border rounded p-2'
          placeholder='Subject Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='description' className='block text-sm font-medium text-gray-700 pt-5'>
          Description
        </label>
        <input
          type='text'
          id='description'
          name='description'
          className='md:w-[50%] border rounded p-2'
          placeholder='Subject description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='bg-blue-600 text-white rounded mt-5 p-2 md:ml-28'>
        Add Subject
      </button>
    </form>
  );
};

export default SubjectForm;
