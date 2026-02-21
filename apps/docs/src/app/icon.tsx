import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0a0a0a', display: 'flex' }}>
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="10" y="6" width="16" height="11" rx="3" fill="white" opacity="0.2" />
        <rect x="7" y="9" width="16" height="11" rx="3" fill="white" opacity="0.45" />
        <rect x="4" y="12" width="16" height="13" rx="3" fill="white" />
        <path
          d="M7.5 23V14L13.5 22V14"
          stroke="#0a0a0a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { ...size },
  );
}
