import { File, Files, Folder } from '../../components/files';

export function FilesDemo() {
  return (
    <Files defaultValue="src/components">
      <Folder name="src">
        <Folder name="components">
          <File name="button.tsx" />
          <File name="input.tsx" />
          <File name="dialog.tsx" />
        </Folder>
        <Folder name="lib">
          <File name="utils.ts" />
          <File name="cn.ts" />
        </Folder>
        <Folder name="hooks">
          <File name="use-debounce.ts" />
          <File name="use-local-storage.ts" />
        </Folder>
        <File name="index.ts" />
      </Folder>
      <Folder name="public">
        <File name="favicon.ico" />
        <File name="logo.svg" />
      </Folder>
      <File name="package.json" />
      <File name="tsconfig.json" />
    </Files>
  );
}
