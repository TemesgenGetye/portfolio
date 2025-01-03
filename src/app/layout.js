import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Temesgen Getye | Portfolio",
  description: "This is my 2024 portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>

      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.addEventListener('load', () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          const message = document.createElement('div');
          message.textContent = 'Please open this website on a PC for the best experience.';
          message.style.position = 'fixed';
          message.style.top = '0';
          message.style.left = '0';
          message.style.width = '100%';
          message.style.backgroundColor = '#f8d7da';
          message.style.color = '#721c24';
          message.style.textAlign = 'center';
          message.style.padding = '10px';
          document.body.appendChild(message);
        }
      });
    `,
        }}
      />
    </html>
  );
}
