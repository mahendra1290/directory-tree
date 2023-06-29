import Checkbox from './Checkbox';
import dirIcon from '../assets/dirIcon.svg';
import fileIcon from '../assets/fileIcon.svg';

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

  return (
    <div className='relative'>
      <div className='absolute border bottom-3 top-6 left-1'></div>
      {!isRoot && <div className='absolute right-full top-3 w-9 border'></div>}
      <Checkbox
        label={label}
        checked={fileNode.selected}
        onChange={handleSelectionChange(fileNode)}
        indeterminate={fileNode.indeteminate}
        className={fileNode.isDirectory ? '' : 'text-gray-500'}
      />
      <div className='pl-10'>
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
