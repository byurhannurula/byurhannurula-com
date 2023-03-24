import '@/styles/globals.css';

export const metadata = {
  title: 'Byurhan Nurula',
  description: '',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
