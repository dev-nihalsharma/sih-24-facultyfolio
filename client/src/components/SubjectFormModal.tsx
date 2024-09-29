'use client';
import { useState } from 'react';
import axios from 'axios';
import { useToken } from './TokenContext';
interface AddSubjectModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AddSubjectModal({ show, onClose }: AddSubjectModalProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useToken();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.API_ENDPOINT}/subject/add`, {
        token,
        name,
        code,
        description,
      });
      setName('');
      setCode('');
      setDescription('');
      onClose(); // Close the modal after submitting
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Add Subject</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              id='name'
              className='w-full border rounded p-2'
              placeholder='Subject name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='code' className='block text-sm font-medium text-gray-700'>
              Code
            </label>
            <input
              type='text'
              id='code'
              className='w-full border rounded p-2'
              placeholder='Subject code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              className='w-full border rounded p-2'
              placeholder='Subject description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <button type='button' className='px-4 py-2 bg-gray-300 rounded' onClick={onClose}>
              Cancel
            </button>
            <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
