/**
 * Fixed parent selection based on children selection
 * @param node node to fix selection
 */
const fixSelection = (node: FileNode) => {
  const areAllChildSelected = node.children?.every((child) => child.selected);
  const areSomeSelected = node.children?.some((child) => child.selected || child.indeteminate);
  node.selected = areAllChildSelected;
  node.indeteminate = !areAllChildSelected && areSomeSelected;
};

/**
 * Sets selection for node and its children
 * @param root root node
 * @param isSelected
 */
const setSelection = (root: FileNode, isSelected: boolean) => {
  root.selected = isSelected;
  root.children?.forEach((child) => setSelection(child, isSelected));
  if (root.isDirectory) {
    fixSelection(root);
  }
};

/**
 * Finds node and set selection
 * @param root node from where it start search
 * @param searchNode node to search for
 * @param isSelected whether to set it selected or not
 * @returns returns new root node
 */
const toggleSelection = (root: FileNode, searchNode: FileNode, isSelected: boolean): FileNode => {
  const copy = structuredClone(root);
  const dfsSearch = (node: FileNode) => {
    if (node.id === searchNode.id) {
      setSelection(node, isSelected);
    } else {
      node.children?.forEach(dfsSearch);
      if (node.isDirectory) {
        fixSelection(node);
      }
    }
  };
  dfsSearch(copy);
  return copy;
};

/**
 * Generates selected paths from root node
 * @param root root node
 * @returns array of selected paths
 */
const generateSelectedPaths = (root: FileNode) => {
  const selectedPaths: string[] = [];
  const dfs = (file: FileNode, path: string) => {
    path += '/' + file.name;
    if (!file.isDirectory && file.selected) {
      selectedPaths.push(path);
    }
    file.children?.forEach((child) => dfs(child, path));
  };
  dfs(root, '');
  return selectedPaths;
};

export { toggleSelection, fixSelection, generateSelectedPaths };
