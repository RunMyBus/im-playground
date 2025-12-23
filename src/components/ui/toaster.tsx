import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-background text-foreground border-border shadow-lg',
          title: 'text-foreground font-semibold',
          description: 'text-muted-foreground',
        },
      }}
    />
  );
}
