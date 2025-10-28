import { File, Files, Folder } from '../../components/files';

export function FilesDemo() {
  return (
    <Files defaultValue="src/components">
      <Folder name="src">
        <Folder name="components">
          <File name="button.tsx" />
          <File name="card.tsx" />
        </Folder>
        <Folder name="pages">
          <File name="index.tsx" />
          <File name="about.tsx" />
        </Folder>
        <File name="app.tsx" />
      </Folder>
    </Files>
  );
}
