import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Viewport } from 'next'

const display = Cormorant_Garamond({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const sans = Noto_Sans_JP({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Haozhong Liu Homepage | CompE @ UIUC",
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
		shortcut: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sans.variable} ${display.variable}`}>{children}</body>
		</html>
	);
}

export const viewport: Viewport = {
  initialScale: 3, // 默认是 1。调大（如 1.2）会放大，调小（如 0.8）会缩小
  width: 'device-width',
}
