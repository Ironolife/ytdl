import { PropsWithChildren } from 'react';
import { videoFormat } from 'ytdl-core';
import DownloadIcon from '../icons/DownloadIcon';

type CellProps = {
  className?: string;
};

const Cell = ({ className, children }: PropsWithChildren<CellProps>) => {
  return (
    <td
      className={
        'px-2 py-2 border border-gray-500' + (className ? ' ' + className : '')
      }
    >
      <div className='flex items-center justify-center'>{children}</div>
    </td>
  );
};

interface FormatsViewProps {
  url: string;
  formats: videoFormat[];
}

const FormatsView = ({ url, formats }: FormatsViewProps) => {
  return (
    <table className='w-full mt-8 table-auto'>
      <thead className='font-medium bg-violet-100 border-white'>
        <tr>
          <Cell>Format</Cell>
          <Cell>Quality</Cell>
          <Cell className='hidden sm:table-cell'>Width</Cell>
          <Cell className='hidden sm:table-cell'>Height</Cell>
          <Cell>Download</Cell>
        </tr>
      </thead>
      <tbody className='border-gray-500'>
        {formats.map(({ itag, container, qualityLabel, width, height }) => (
          <tr key={itag}>
            <Cell>{container}</Cell>
            <Cell>{qualityLabel}</Cell>
            <Cell className='hidden sm:table-cell'>{width}</Cell>
            <Cell className='hidden sm:table-cell'>{height}</Cell>
            <Cell>
              <a
                className='text-green-500'
                href={`${process.env.REACT_APP_API_URL}/download?url=${url}&itag=${itag}`}
                target='_black'
                rel='noreferrer'
              >
                <DownloadIcon />
              </a>
            </Cell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormatsView;
