import { useState } from 'react';
import { videoFormat } from 'ytdl-core';
import Footer from './components/Footer/Footer';
import FormatsView from './components/FormatsView/FormatsView';
import Header from './components/Header/Header';
import Searchbar from './components/SearchBar/SearchBar';

const App = () => {
  const [url, setUrl] = useState('');
  const [formats, setFormats] = useState<videoFormat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async (url: string) => {
    setLoading(true);
    setFormats(null);
    setError(null);

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/formats?url=${url}`,
      {
        method: 'GET',
      }
    );

    if (res.ok) {
      setUrl(url);
      setFormats(await res.json());
    } else {
      setError(await res.text());
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <main
        className='w-full max-w-3xl mx-auto py-16 text-gray-800'
        style={{ flex: '1 0 auto' }}
      >
        <section className='w-full px-4'>
          <Header />
          <Searchbar onSubmit={onSearch} />
          {error && (
            <div className='mt-8 text-center text-red-500'>{error}</div>
          )}
          {loading ? (
            <div className='mt-8 text-center'>Loading ...</div>
          ) : formats ? (
            <FormatsView url={url} formats={formats} />
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default App;
