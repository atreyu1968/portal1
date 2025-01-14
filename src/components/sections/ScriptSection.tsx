import { useEffect, useRef } from 'react';
import { addSecurityHeaders } from '@/lib/middleware/security';

interface ScriptSectionProps {
  content: {
    code: string;
    loadEvent?: 'immediate' | 'domready' | 'window-load';
    sandbox?: boolean;
  };
}

export function ScriptSection({ content }: ScriptSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { code, loadEvent = 'immediate', sandbox = true } = content;

  useEffect(() => {
    if (!containerRef.current) return;

    const executeScript = () => {
      try {
        if (sandbox) {
          // Create a sandboxed iframe for untrusted scripts
          const iframe = document.createElement('iframe');
          iframe.sandbox.add('allow-scripts');
          iframe.sandbox.add('allow-same-origin');
          
          // Set security headers
          const blob = new Blob([`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'">
              </head>
              <body>
                <script>${code}</script>
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
          // Execute trusted scripts directly
          const scriptElement = document.createElement('script');
          scriptElement.text = code;
          containerRef.current.appendChild(scriptElement);
        }
      } catch (error) {
        console.error('Error executing script:', error);
      }
    };

    const cleanup = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (iframeRef.current) {
        iframeRef.current = null;
      }
    };

    switch (loadEvent) {
      case 'domready':
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', executeScript);
          return () => {
            document.removeEventListener('DOMContentLoaded', executeScript);
            cleanup();
          };
        }
        break;
      
      case 'window-load':
        if (document.readyState !== 'complete') {
          window.addEventListener('load', executeScript);
          return () => {
            window.removeEventListener('load', executeScript);
            cleanup();
          };
        }
        break;
    }

    executeScript();
    return cleanup;
  }, [code, loadEvent, sandbox]);

  return (
    <div 
      ref={containerRef} 
      className="script-section relative"
      style={{ minHeight: '20px' }}
    />
  );
}