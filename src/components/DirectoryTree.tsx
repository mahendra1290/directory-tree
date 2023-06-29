import Checkbox from './Checkbox';
import dirIcon from '../assets/dirIcon.svg';
import fileIcon from '../assets/fileIcon.svg';

interface DirectoryTreeProps {
  isRoot?: boolean;
  fileNode: FileNode;
  allSelected?: boolean;
  onSelect?: (file: FileNode) => void;
  onDeselect?: (file: FileNode) => void;
}

const DirectoryTree = ({
  fileNode: directory,
  isRoot,
  onSelect,
  onDeselect,
}: DirectoryTreeProps) => {
  const handleFileChange = (file: FileNode) => (checked: boolean) => {
    if (directory.indeteminate && !directory.selected) {
      onSelect?.(file);
      return;
    }
    if (checked) {
      onSelect?.(file);
    } else {
      onDeselect?.(file);
    }
  };

  const label = (
    <span className='flex font-mono items-center gap-2'>
      <img
        src={directory.isDirectory ? dirIcon : fileIcon}
        alt={directory.name}
        className='w-4 h-4'
      />
      {directory.name}
    </span>
  );

  return (
    <div className='relative'>
      <div className='absolute border bottom-3   top-6 left-1'></div>
      {!isRoot && <div className='absolute right-full top-3 w-9 border'></div>}
      <Checkbox
        label={label}
        checked={directory.selected}
        onChange={handleFileChange(directory)}
        indeterminate={directory.indeteminate}
        className={directory.isDirectory ? '' : 'text-gray-500'}
      />
      <div className='pl-10'>
        {directory.children?.map((directory) => (
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
