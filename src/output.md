# TSX Files

- File: ./app/page.tsx

```
import BottomNavigation from "@/src/components/bottom-navigation";

export default function Home() {
  return (
    <section className="h-screen relative">
      <BottomNavigation />
    </section>
  );
}
```

- File: ./app/profile/page.tsx

```
export default function Profile() {
  return (
    <div>
      <div>welcome to profile</div>
    </div>
  );
}
```

- File: ./app/profile/layout.tsx

```
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
```

- File: ./app/providers.tsx

```
"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
```

- File: ./app/market/page.tsx

```
export default function Market() {
  return (
    <main>
      <div>welcome to market</div>
    </main>
  );
}
```

- File: ./app/market/layout.tsx

```
export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
```

- File: ./app/layout.tsx

```
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js?56" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="h-screen container mx-auto max-w-screen-sm">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
```

- File: ./app/orders/page.tsx

```
export default function Orders() {
  return (
    <main>
      <div>welcome to orders</div>
    </main>
  );
}
```

- File: ./app/orders/layout.tsx

```
export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
```

- File: ./app/store/page.tsx

```
export default function Store() {
  return (
    <main>
      <div>welcome to store</div>
    </main>
  );
}
```

- File: ./app/store/layout.tsx

```
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
```

- File: ./app/error.tsx

```
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
```

- File: ./components/navbar.tsx

```
import { Avatar, Navbar, NavbarContent, NavbarItem } from "@heroui/react";

const CustomNavbar = () => {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarItem>
          <span>Telemart</span>
        </NavbarItem>
        <NavbarItem>
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
```

- File: ./components/bottom-navigation.tsx

```
import { FaHome, FaShoppingCart, FaStore, FaUser } from "react-icons/fa";
import { Link } from "@heroui/link";

const BottomNavigation = () => {
  return (
    <div className="w-full flex justify-between absolute bottom-0 right-0 left-0 z-50 p-4">
      <Link
        className="flex flex-col justify-center w-12 gap-y-2"
        href="/market"
      >
        <FaHome size={18} />
        <span className="text-xs">Market</span>
      </Link>
      <Link className="flex flex-col justify-center w-12 gap-y-2" href="/store">
        <FaStore size={18} />
        <span className="text-xs">Store</span>
      </Link>
      <Link
        className="flex flex-col justify-center w-12 gap-y-2"
        href="/orders"
      >
        <FaShoppingCart size={18} />
        <span className="text-xs">Orders</span>
      </Link>
      <Link
        className="flex flex-col justify-center w-12 gap-y-2"
        href="/profile"
      >
        <FaUser size={18} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
```
