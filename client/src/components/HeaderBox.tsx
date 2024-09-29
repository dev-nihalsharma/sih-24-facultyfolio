import React from 'react';

interface HeaderBoxProps {
  type: string;
  title: string;
  subtext: string;
  username: string;
}

const HeaderBox = ({ type = 'title', title, subtext, username }: HeaderBoxProps) => {
  return (
    <div className='flex flex-col gap-1 my-10'>
      <h1 className='text-3xl lg:text-30 font-semibold text-gray-900'>
        {title}
        {type === 'greeting' && <span className='text-[#0179FE]'> &nbsp;{username}</span>}
      </h1>
      <p className='text-14 lg:text-16 font-normal text-gray-600'>{subtext}</p>
    </div>
  );
};

export default HeaderBox;
