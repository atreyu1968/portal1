import ReactPlayer from 'react-player';

interface VideoSectionProps {
  content: {
    url: string;
    title?: string;
    description?: string;
    width?: string;
    height?: string;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    playing?: boolean;
  };
}

export function VideoSection({ content }: VideoSectionProps) {
  const {
    url,
    title,
    description,
    width = '100%',
    height = '480px',
    controls = true,
    muted = false,
    loop = false,
    playing = false
  } = content;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <div className="relative aspect-video rounded-lg overflow-hidden">
        <ReactPlayer
          url={url}
          width={width}
          height={height}
          controls={controls}
          muted={muted}
          loop={loop}
          playing={playing}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0
              }
            }
          }}
        />
      </div>
    </div>
  );
}