interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div
      style={{
        backgroundColor: '#fee',
        color: '#c33',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #fcc',
        marginBottom: '1rem',
      }}
    >
      {message}
    </div>
  );
}

