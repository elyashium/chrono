import { useState, useEffect } from 'react';

export function useStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Load initial value
    chrome.storage.sync.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
      }
    });

    // Listen for changes
    const listener = (changes) => {
      if (changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [key]);

  const updateValue = (newValue) => {
    chrome.storage.sync.set({ [key]: newValue });
    setValue(newValue);
  };

  return [value, updateValue];
}
