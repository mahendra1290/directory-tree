import { useState } from 'react';
import DirectoryTree from './components/DirectoryTree';
import { generateSelectedPaths, toggleSelection } from './utils';
import data from './data';
import Checkbox from './components/Checkbox';

const App = () => {
  const [state, setState] = useState(data);
  const [paths, setPaths] = useState<string[]>([]);
  const [showSelected, setShowSelected] = useState(false);

  const handleSelect = (file: FileNode) => {
    setState(toggleSelection(state, file, true));
  };

  const handleDeselect = (file: FileNode) => {
    setState(toggleSelection(state, file, false));
  };

  const handleSubmit = () => {
    setPaths(generateSelectedPaths(state));
  };

  return (
    <div className='p-4 mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-3xl mb-4 text-blue-600'>Directory Tree</h1>
        <Checkbox label={'Show selected paths'} checked={showSelected} onChange={setShowSelected} />
      </div>
      <div className='border border-teal-400 p-4 rounded-md text-lg text-gray-700 shadow-sm'>
        <DirectoryTree
          isRoot
          fileNode={state}
          onDeselect={handleDeselect}
          onSelect={handleSelect}
        />
      </div>
      <button
        className='disabled:bg-slate-300 hover:opacity-80 disabled:text-black mx-auto block mt-2 px-4 py-2 rounded-md bg-blue-400 text-white'
        onClick={handleSubmit}
      >
        Submit
      </button>
      {paths.length > 0 && (
        <div className='max-w-lg border p-4 rounded-md mt-2'>
          <p className='text-lg mb-2'>You have selected files:</p>
          {paths.map((path) => (
            <p className='font-mono p-2 mb-2 bg-blue-100 rounded-md' key={path}>
              {path}
            </p>
          ))}
        </div>
      )}
      {showSelected && (
        <div className='max-w-lg border p-4 rounded-md mt-2'>
          <p className='text-lg mb-2'>Selected Files:</p>
          {generateSelectedPaths(state).map((path) => (
            <p className='font-mono p-2 mb-2 bg-blue-100 rounded-md' key={path}>
              {path}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
