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
		],
	},
};

// https://lh3.googleusercontent.com/a/ACg8ocKBVQfni-QVjdMiu5CH5bTmXQhE9hqV8etdGRw84pkG=s96-c

module.exports = nextConfig;
