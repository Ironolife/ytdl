import pk from '../../../package.json';
const version = pk.version;

const Header = () => (
  <header className='flex text-xl'>
    <h1>Youtube Downloader</h1>
    <div className='flex-1' />
    <code className='opacity-50'>v{version}</code>
  </header>
);

export default Header;
