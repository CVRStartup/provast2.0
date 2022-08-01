module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "tailwindui.com",
      "www.callcentrehelper.com",
      "s.gravatar.com",
      "media-exp1.licdn.com",
      "avatars.githubusercontent.com",
      "cracku.in",
      "cdn.shopify.com",
      "www.task.telangana.gov.in",
      "webimages.mongodb.com",
    ],
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });

    return config;
  },
};
