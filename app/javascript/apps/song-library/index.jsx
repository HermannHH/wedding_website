import React, { useState } from 'react';
import Async from 'react-select/async';
import axios from 'axios';


var timeout = null;


function SongLibrary({ create_song_request_path }) {

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
    var el = document.createElement('div');
    el.style.cssText = 'display:hidden;';
    try {
      const data = {
        song: {
          name: opt.trackCensoredName,
          artist: opt.artistName,
          payload: JSON.stringify(opt)
        }
      }
      axios.post(create_song_request_path, data);
      el.setAttribute('data-notyf-type', 'success');
      el.setAttribute('data-notyf-message', 'Your song request has been added.');
    } catch (error) {
      console.error('error', error);
      el.setAttribute('data-notyf-type', 'error');
      el.setAttribute('data-notyf-message', 'Your song choice could not be added at this point in time');
    } finally {
      el.setAttribute('data-controller', 'notyf');
      document.body.appendChild(el);
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
          styles={{
            menu: () => ({
              zIndex: 20,
              position: 'absolute',
              width: '100%',
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            })
          }}
          value={val}
          placeholder="Just start typing..."
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={opt => saveSelectedSong(opt.value)}
          noOptionsMessage={() => "Keep typing to see more results"}
        />
      </div>
    </div>
  );
}

export default SongLibrary;
