const data: FileNode = {
  name: 'root',
  id: 'root',
  isDirectory: true,
  children: [
    { id: 'hell', name: 'hello.js' },
    { id: 'he', name: 'hell.js' },
    {
      id: 'home',
      name: 'home',
      isDirectory: true,
      children: [
        { id: 'index', name: 'index.html' },
        { id: 'temp', name: 'temp.ts' },
      ],
    },
    {
      id: 'prok',
      name: 'projects',
      isDirectory: true,
      children: [
        { id: 'pro1', name: 'project1.ts' },
        { id: 'pro2', name: 'project2.js' },
        { id: 'npro', name: 'tsconfig.ts' },
        {
          name: 'self',
          isDirectory: true,
          id: 'sell',
          children: [
            { id: 'mainse', name: 'main.tsx' },
            { id: 'sc', name: 'script.sh' },
            { id: 'ts', name: 'tsconfig.ts' },
          ],
        },
      ],
    },
    { id: 'hello', name: 'vite.js' },
    {
      id: 'tests',
      name: '__test__',
      isDirectory: true,
      children: [
        { id: 'index1', name: 'A.test.tsx' },
        { id: 'temp2', name: 'root.test.tsx' },
      ],
    },
  ],
};

export default data;
