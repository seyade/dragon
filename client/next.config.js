/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/a/**",
			},
			{
				protocol: "https",
				hostname: "s.gravatar.com",
				port: "",
				pathname: "/avatar/**",
			},
		],
	},
};

module.exports = nextConfig;
