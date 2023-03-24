import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function Home() {
  return (
    <main className={`${inter.variable} font-sans`}>
      <h1 className="font-bold text-4xl">Hello World!</h1>
    </main>
  );
}
