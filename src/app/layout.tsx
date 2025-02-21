import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";


export const metadata: Metadata = {
  title: "Linkpad",
  description: "Text editor with collaboration",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      layout: {
        unsafe_disableDevelopmentModeWarnings: true
      },
    }}>
      <html lang="en">
        <body>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
