"use client";

interface OpenChatButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function OpenChatButton({ children, className }: OpenChatButtonProps) {
  const handleClick = () => {
    window.postMessage({ type: 'OPEN_CHAT' }, window.location.origin);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
