import { useState } from 'react';
import DirectoryTree from './components/DirectoryTree';
import { generateSelectedPaths, toggleSelection } from './utils';
import data from './data';
import Checkbox from './components/Checkbox';
import SelectedFiles from './components/SelectedFiles';

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
      <div className='flex-col flex md:flex-row gap-4'>
        <div className='flex-1 border border-teal-400 p-4 rounded-md text-lg text-gray-700 shadow-sm'>
          <DirectoryTree
            isRoot
            fileNode={state}
            onDeselect={handleDeselect}
            onSelect={handleSelect}
          />
        </div>

        <div className='flex-1 max-w-full md:max-w-xl border p-4 rounded-md'>
          {paths.length !== 0 && <SelectedFiles heading='You have selected files:' files={paths} />}
          {showSelected && (
            <SelectedFiles heading='Selected Files:' files={generateSelectedPaths(state)} />
          )}
        </div>
      </div>
      <div className='flex justify-center gap-2'>
        <button className='btn' onClick={handleSubmit}>
          Submit
        </button>
        <button className='btn' onClick={() => setState(data)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
