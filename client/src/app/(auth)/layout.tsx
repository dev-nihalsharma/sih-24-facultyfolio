import Image from 'next/image';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex justify-between min-h-screen w-full font-inter'>
      {children}
      <div className='flex h-screen w-full top-0 items-center justify-end sticky bg-sky-100 max-lg:hidden'>
        <div className='w-[800px] h-[600px] border-4 border-black rounded-lg'>
          <Image
            src='/dashboard.png'
            width={800}
            height={1000}
            alt='FacultyFolio Dashboard'
            className='rounded-lg  '
          />
        </div>
      </div>
    </div>
  );
}
