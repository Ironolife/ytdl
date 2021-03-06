import pk from '../../../package.json';
const version = pk.version;

const Header = () => (
  <header className='flex flex-col items-center'>
    <h1 className='text-2xl mb-2'>Youtube Downloader</h1>
    <a
      href='https://github.com/Ironolife/YTDL'
      target='_black'
      rel='noreferrer'
    >
      <div className='text-xl'>v{version}</div>
    </a>
  </header>
);

export default Header;
