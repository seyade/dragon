import type { Metadata } from "next";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dragon - Choose your Cofounders wisely",
	description: "Platform where Cofounders are on steroid",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<UserProvider>
				<body className={inter.className}>
					<div className="h-screen">
						<Header />
						{children}
						<Footer />
					</div>
				</body>
			</UserProvider>
		</html>
	);
}
