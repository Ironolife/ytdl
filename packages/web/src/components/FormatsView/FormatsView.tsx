import { videoFormat } from 'ytdl-core';
import { PropsWithChildren, MouseEventHandler } from 'react';
import DownloadIcon from '../icons/DownloadIcon';
import formatFileSize from '../../utils/formatFileSize/formatFileSize';

type CellProps = {
  className?: string;
};

const Cell = ({ className, children }: PropsWithChildren<CellProps>) => {
  return (
    <td className={'px-2 py-2 border' + (className ? ' ' + className : '')}>
      <div className='flex items-center justify-center'>{children}</div>
    </td>
  );
};

type DownloadButtonProps = {
  url: string;
  itag: number;
};

const DownloadButton = ({ url, itag }: DownloadButtonProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/download?url=${url}&itag=${itag}`,
      '_blank'
    );
  };

  return (
    <button className='text-green-500' type='button' onClick={handleClick}>
      <DownloadIcon />
    </button>
  );
};

interface FormatsViewProps {
  url: string;
  formats: videoFormat[];
}

const FormatsView = ({ url, formats }: FormatsViewProps) => {
  return (
    <table className='w-full mt-8 table-auto'>
      <thead className='bg-violet-500 text-white border-white'>
        <tr>
          <Cell>Format</Cell>
          <Cell>Quality</Cell>
          <Cell className='hidden sm:table-cell'>Width</Cell>
          <Cell className='hidden sm:table-cell'>Height</Cell>
          <Cell>File Size</Cell>
          <Cell>Download</Cell>
        </tr>
      </thead>
      <tbody className='border-gray-500'>
        {formats.map(
          ({ itag, container, qualityLabel, width, height, contentLength }) => (
            <tr key={itag}>
              <Cell>{container}</Cell>
              <Cell>{qualityLabel}</Cell>
              <Cell className='hidden sm:table-cell'>{width}</Cell>
              <Cell className='hidden sm:table-cell'>{height}</Cell>
              <Cell>
                {contentLength
                  ? formatFileSize(parseInt(contentLength, 10))
                  : '?'}
              </Cell>
              <Cell>
                <DownloadButton url={url} itag={itag} />
              </Cell>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default FormatsView;
