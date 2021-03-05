import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import SearchIcon from '../icons/SearchIcon';

type SearchBarProps = {
  onSubmit: (url: string) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [url, setUrl] = useState('');
  useEffect(() => {}, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUrl(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    onSubmit(url);
  };

  return (
    <form
      className='flex items-center mt-8 px-4 py-2 border border-gray-500'
      onSubmit={handleSubmit}
    >
      <input
        className='w-full mr-4'
        value={url}
        onChange={handleChange}
        type='url'
        placeholder='http://youtube.com/watch?v=...'
      />
      <button
        className={url ? '' : 'opacity-50 pointer-events-none'}
        type='submit'
        disabled={!url}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
