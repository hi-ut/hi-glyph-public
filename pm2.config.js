module.exports = {
  apps: [
    {
      name: "hi-glyph",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      // interpreter: "~/.bun/bin/bun",
      // exec_mode: 'cluster',
      // max_memory_restart: "1500M",
    },
  ],
};
