export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            let store = localStorage.getItem('nach-theme-color');
            if (store) {
              let parsed = JSON.parse(store);
              if (parsed.state && parsed.state.color) {
                document.documentElement.dataset.themeColor = parsed.state.color;
              }
            }
          } catch (e) {}
        `,
      }}
    />
  );
}
