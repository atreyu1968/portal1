import { useEffect, useRef } from 'react';
import { addSecurityHeaders } from '@/lib/middleware/security';

interface HtmlSectionProps {
  content: {
    html: string;
    css?: string;
    maxWidth?: string;
    padding?: string;
    sandbox?: boolean;
  };
}

export function HtmlSection({ content }: HtmlSectionProps) {
  const { html, css, maxWidth = '100%', padding = '0', sandbox = true } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (sandbox) {
      // Create a sandboxed iframe for untrusted HTML
      const iframe = document.createElement('iframe');
      iframe.sandbox.add('allow-same-origin');
      iframe.sandbox.add('allow-scripts');
      
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'">
            <style>
              ${css || ''}
              body { margin: 0; }
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `], { type: 'text/html' });

      const url = URL.createObjectURL(blob);
      iframe.src = url;
      
      // Clean up previous iframe if it exists
      if (iframeRef.current) {
        containerRef.current.removeChild(iframeRef.current);
      }
      
      containerRef.current.appendChild(iframe);
      iframeRef.current = iframe;

      // Clean up URL object
      URL.revokeObjectURL(url);
    } else {
      // Render trusted HTML directly
      if (css) {
        const style = document.createElement('style');
        style.textContent = css;
        containerRef.current.appendChild(style);
      }
      containerRef.current.innerHTML += html;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (iframeRef.current) {
        iframeRef.current = null;
      }
    };
  }, [html, css, sandbox]);

  return (
    <div 
      className="w-full"
      style={{ padding }}
    >
      <div 
        ref={containerRef}
        style={{ 
          maxWidth,
          margin: '0 auto'
        }}
      />
    </div>
  );
}