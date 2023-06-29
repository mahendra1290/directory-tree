import Checkbox from './Checkbox';
import dirIcon from '../assets/dirIcon.svg';
import fileIcon from '../assets/fileIcon.svg';
import { useEffect, useRef, useState } from 'react';

interface DirectoryTreeProps {
  isRoot?: boolean;
  fileNode: FileNode;
  onSelect?: (file: FileNode) => void;
  onDeselect?: (file: FileNode) => void;
}

/**
 * DirectoryTree component that renders a directory tree recursively.
 * @param props fileNode: the root node of the directory tree
 * @param props isRoot: whether the current node is the root node
 * @param props onSelect: callback function when a file is selected
 * @param props onDeselect: callback function when a file is deselected
 * @returns JSX.Element
 */
const DirectoryTree = ({ fileNode, isRoot, onSelect, onDeselect }: DirectoryTreeProps) => {
  const handleSelectionChange = (file: FileNode) => (checked: boolean) => {
    if (checked || fileNode.indeteminate) {
      onSelect?.(file);
    } else {
      onDeselect?.(file);
    }
  };

  const label = (
    <span className='flex font-mono items-center gap-2'>
      <img
        src={fileNode.isDirectory ? dirIcon : fileIcon}
        alt={fileNode.name}
        className='w-4 h-4'
      />
      {fileNode.isDirectory && '/'}
      {fileNode.name}
    </span>
  );

  const ref = useRef<HTMLDivElement>(null);

  const [bottom, setBottom] = useState(0);
  const [bottom1, setBottom1] = useState(0);

  useEffect(() => {
    const lastChild = ref.current?.lastChild as HTMLDivElement | undefined;
    const childReversed = [...(fileNode.children || [])].reverse();
    let selectedIndex = childReversed.findIndex((child) => child.selected || child.indeteminate);

    if (selectedIndex !== -1) {
      let selectedChild = ref.current?.childNodes[childReversed.length - selectedIndex - 1] as
        | HTMLDivElement
        | undefined;
      setBottom1((selectedChild?.offsetTop || 0) - 10);
    } else {
      setBottom1(0);
    }
    setBottom((ref.current?.offsetHeight || 0) - (lastChild?.offsetTop || 0) + 14);
  }, [fileNode]);

  return (
    <div className='relative'>
      <div style={{ bottom }} className={`absolute z-10 border bottom-3 top-6 left-[0.3rem]`}></div>
      <div
        style={{
          height: bottom1,
        }}
        className={`absolute z-20 transition-all bg-blue-400 w-[2px] top-6 left-[0.3rem] `}
      ></div>
      {!isRoot && (
        <div
          className={`absolute transition-all z-0 right-full top-3 w-[2.2rem] border ${
            fileNode.indeteminate ? 'border-green-400' : ''
          } ${fileNode.selected ? 'border-blue-400' : ''}  `}
        ></div>
      )}
      <Checkbox
        label={label}
        checked={fileNode.selected}
        onChange={handleSelectionChange(fileNode)}
        indeterminate={fileNode.indeteminate}
        className={fileNode.isDirectory ? '' : 'text-gray-500'}
      />
      <div ref={ref} className='pl-10'>
        {fileNode.children?.map((directory) => (
          <DirectoryTree
            key={directory.name}
            fileNode={directory}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectoryTree;
