'use client';

import { File, Files, Folder } from '../../components/files';

export function Default() {
  return (
    <Files defaultValue="src/components/ui">
      <Folder name="src" status="modified">
        <File name="main.tsx" />
        <File name="App.tsx" status="modified" />
        <File name="index.css" />

        <Folder name="components">
          <Folder name="ui" status="modified">
            <File name="button.tsx" />
            <File name="card.tsx" status="modified" />
            <File name="toast.tsx" status="added" />
          </Folder>

          <File name="header.tsx" />
          <File name="footer.tsx" />
        </Folder>

        <Folder name="hooks" status="untracked">
          <File name="use-auth.ts" status="untracked" />
          <File name="use-toast.ts" status="untracked" />
        </Folder>

        <Folder name="lib">
          <File name="cn.ts" />
          <File name="utils.ts" />
        </Folder>
      </Folder>

      <Folder name="public">
        <File name="favicon.svg" />
      </Folder>

      <File name=".env" status="ignored" />
      <File name=".eslintrc.cjs" />
      <File name="index.html" />
      <File name="package.json" status="modified" />
      <File name="tsconfig.json" />
      <File name="vite.config.ts" />
    </Files>
  );
}
