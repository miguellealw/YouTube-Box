module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // Use Docker service name when running in container, localhost otherwise
    const apiUrl = process.env.API_URL || "http://server:5000";

    return [
      {
        source: "/auth/v1.0/:path*", // client
        destination: `${apiUrl}/auth/v1.0/:path*`, // api server
      },
      {
        source: "/api/v1.0/:path*", // client
        destination: `${apiUrl}/api/v1.0/:path*`, // api server
      },
    ];
  },

  images: {
    domains: ["yt3.ggpht.com", "i.ytimg.com", "s.gravatar.com"],
  },

  env: {
    API_URL: process.env.API_URL,
  },

  // TODO: fix type errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
