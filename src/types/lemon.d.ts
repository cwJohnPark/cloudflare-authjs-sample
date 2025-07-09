// Lemon Squeezy Lemon.js TypeScript definitions

declare global {
  interface Window {
    Lemon: {
      url: string;
      loader: {
        url?: string;
        signature?: string;
      };
      Setup: (options?: { eventHandler?: (event: LemonEvent) => void }) => void;
      Refresh: () => void;
    };
  }
}

// Lemon.js Event Types
export interface LemonEvent {
  event: string;
  data?: {
    checkout_id?: string;
    order_id?: string;
    variant_id?: string;
    customer_id?: string;
    [key: string]: unknown;
  };
}

// Lemon Squeezy Button Props
export interface LemonSqueezyButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  variant?: string;
  embed?: boolean;
  dark?: boolean;
  logo?: boolean;
  media?: boolean;
  desc?: boolean;
  discount?: boolean;
  enabled?: boolean;
  [key: string]: unknown;
}

export {};
