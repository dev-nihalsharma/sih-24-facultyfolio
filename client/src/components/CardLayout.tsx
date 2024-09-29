import Link from 'next/link';
import { HiExternalLink, HiAcademicCap } from 'react-icons/hi';

interface ArticleData {
  title: string;
  link: string;
  citation_id: string;
  authors: string;
  publication: string;
  cited_by: {
    value: number;
    link: string;
  };
  year: string;
}

export default function ArticleCard({
  title,
  link,
  citation_id,
  authors,
  publication,
  cited_by,
  year,
}: ArticleData) {
  return (
    <div className='border-b  dark:bg-gray-800 p-6  hover:shadow-2xl'>
      <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>{title}</h3>
      <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
        <strong>Authors:</strong> {authors}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
        <strong>Published in:</strong> {publication}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
        <strong>Year:</strong> {year}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
        <strong>Cited by:</strong>{' '}
        <a href={cited_by.link} target='_blank'>
          <span className='text-blue-500 hover:underline flex items-center'>
            {cited_by.value} <HiExternalLink className='ml-1' />
          </span>
        </a>
      </p>
      <div className='mt-4'>
        <a href={link} target='_blank'>
          <button className='text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded inline-flex items-center'>
            <HiAcademicCap className='mr-2' />
            View Article
          </button>
        </a>
      </div>
    </div>
  );
}
