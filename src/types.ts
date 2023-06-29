interface FileNode {
  id: string;
  name: string;
  selected?: boolean;
  indeteminate?: boolean;
  isDirectory?: boolean;
  children?: FileNode[];
}
