const presets = [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "69",
          safari: "11.1",
        },
        useBuiltIns: "usage",
      },
    ],
  ];
  
  module.exports = { presets };