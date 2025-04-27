import { useState } from 'react';
import Gallery from './components/Gallery';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Infinite Scrolling Gallery</h1>
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <Gallery query={query} />
    </div>
  );
}

export default App;
