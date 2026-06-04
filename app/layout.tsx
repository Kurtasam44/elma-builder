import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ELMA Builder - Sıralı İşlem Yöneticisi',
  description: 'ELMA: Chat arayüzlü build process yöneticisi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
        {children}
      </body>
    </html>
  );
}
