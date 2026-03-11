'use client';

import { Files } from '../../components/files';

export function Default() {
  return (
    <Files defaultValue="src/components/ui">
      <Files.Folder name="src" status="modified">
        <Files.File name="main.tsx" />
        <Files.File name="App.tsx" status="modified" />
        <Files.File name="index.css" />

        <Files.Folder name="components">
          <Files.Folder name="ui" status="modified">
            <Files.File name="button.tsx" />
            <Files.File name="card.tsx" status="modified" />
            <Files.File name="toast.tsx" status="added" />
          </Files.Folder>

          <Files.File name="header.tsx" />
          <Files.File name="footer.tsx" />
        </Files.Folder>

        <Files.Folder name="hooks" status="untracked">
          <Files.File name="use-auth.ts" status="untracked" />
          <Files.File name="use-toast.ts" status="untracked" />
        </Files.Folder>

        <Files.Folder name="lib">
          <Files.File name="cn.ts" />
          <Files.File name="utils.ts" />
        </Files.Folder>
      </Files.Folder>

      <Files.Folder name="public">
        <Files.File name="favicon.svg" />
      </Files.Folder>

      <Files.File name=".env" status="ignored" />
      <Files.File name=".eslintrc.cjs" />
      <Files.File name="index.html" />
      <Files.File name="package.json" status="modified" />
      <Files.File name="tsconfig.json" />
      <Files.File name="vite.config.ts" />
    </Files>
  );
}
