import axios from 'axios';
import { useState } from 'react'

function App() {
  const [url, setUrl] = useState<string>("");
  const [metadata, setMetadata] = useState<any>(null);

  const fetchMetadata = async()=>{
    try {
      const response = await axios.post('http://localhost:8000/api/fetch-metadata', {url});
      console.log(response)
      setMetadata(response.data);
    } catch (error) {
      console.error("Error fetching Metadata", error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-2xl font-bold mb-6 text-center'>URL Metadata Fetcher</h1>
        <div className='mb-4'>
          <input type="text" value={url} onChange={(e)=>{setUrl(e.target.value)}} placeholder='Enter URL'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500'
           />
        </div>
        <button className='w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition' onClick={fetchMetadata}>Fetch Metadata</button>

        {metadata && (
          <div className='mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
            <h2 className='text-xl font-semibold mb-2'>{metadata.title}</h2>
            <p className='text-gray-600 mb-4'>{metadata.description}</p>
            {metadata.image && (
              <img src={metadata.image} alt="Preview" className='w-full h-40 object-cover rounded-lg' />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
