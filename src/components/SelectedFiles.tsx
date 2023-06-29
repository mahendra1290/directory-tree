interface SelectedFilesProps {
  files: string[];
  heading: string;
}

const SelectedFiles = ({ files, heading }: SelectedFilesProps) => {
  return (
    <>
      <p className='text-lg mb-2'>{heading}</p>
      {files.map((path) => (
        <p className='font-mono p-2 mb-2 bg-blue-100 rounded-md' key={path}>
          {path}
        </p>
      ))}
    </>
  );
};

export default SelectedFiles;
