module.exports = {
  main: {
    input: "./src/api/schema.json",
    output: {
      target: "./src/api/generated.ts",
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
