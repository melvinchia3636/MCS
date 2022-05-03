/* eslint-disable import/extensions */
import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchInput from './SearchInput.jsx';
import SearchResults from './SearchResults.jsx';

function Search() {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    setSearchQuery(new URL(window.location.toString()).searchParams.get('q') || null);
  }, [location]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-4">
      {searchQuery ? <SearchResults /> : <SearchInput />}
    </div>
  );
}

export default Search;
