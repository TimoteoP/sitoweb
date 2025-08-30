interface YouTubeProps {
  id: string;
  title?: string;
}

export default function YouTube({ id, title }: YouTubeProps) {
  // iframemanager will replace this div with a placeholder and gated iframe
  return (
    <div style={{ margin: '1rem 0' }}>
      <div data-service="youtube" data-id={id} data-title={title || 'YouTube video'} />
      <noscript>
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
          Guarda su YouTube
        </a>
      </noscript>
    </div>
  );
}

