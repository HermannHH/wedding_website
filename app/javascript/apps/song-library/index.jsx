import React, { useState, useCallback } from 'react';
import Async from 'react-select/async';
import axios from 'axios';


var timeout = null;


function SongLibrary({ create_song_request_path }) {

  console.log('create_song_request_path', create_song_request_path)
  const [ val, setVal ] = useState('');

  function handleInputChange(value) {
    setVal(value);
    return value;
  };

  async function searchAppleMusic() {
    try {
      const resp = await axios.get(`https://itunes.apple.com/search?term=${val}&country=za&media=music&limit=10`);
      return resp;
    } catch (error) {
      console.error('error', error);
    }
  }

  async function saveSelectedSong(opt) {
    try {
      const data = {
        song: {
          name: opt.trackCensoredName,
          artist: opt.artistName,
          payload: JSON.stringify(opt)
        }
      }
      axios.post(create_song_request_path, data);
    } catch (error) {
      console.error('error', error)
    }
  }


  function loadOptions(value, callback) {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      var resp = await searchAppleMusic();
      var mapped = resp.data.results.map( record => (
        {label: `${record.artistName} - ${record.trackCensoredName}`, value: {...record}}
      ))
      await callback(mapped);
      setVal('');
    }, 1500);
  };

  // const handler = useCallback(debounce(loadOptions, 2000), []);

  return (
    <div className="app">
      <div className="container">
        <Async
          value={val}
          placeholder="Start typing to search for a song..."
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={opt => saveSelectedSong(opt.value)}
        />
      </div>
    </div>
  );
}

export default SongLibrary;
