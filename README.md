# Camoswag

Camoswag is a Camouflage extension which allows you to generate your mockfiles using an OpenAPI Specification.

For more information on Camouflage, see [documentation](https://fauxauldrich.github.io/camouflage/)

# Getting Started

- To use `camoswag`, you would need your OpenAPI specification file in either .json or .yaml format.
- You don't need to install `camoswag` in order to run, you can simply run it using `npx`
- Run the command: `npx camoswag --spec ./swagger.yaml` or `npx camoswag --spec ./swagger.json`. (Replace file location with your spec file location)
- This would create a new folder with the name `camouflage-${current_timestamp}` containing the required folder structure and mock files corresponding to each endpoint defined in your spec file.
- You can either delete or modify the dummy responses placed in the mockfiles as per your expectations. Once you are satisfied with the modifications, you can move the contents of the folder to your original ${MOCK_DIR} of your running Camouflage server.
- Note that if your spec file doesn't contain a response defined for a given endpoint, `camoswag` would put following default response in the mock file.

```json
{
  "message": "More Configuration Needed"
}
```

Note: camoswag currenty supports JSON responses only.


- To install `camoswag` locally, run command `npm i -g camoswag`
- Run conversion command using `camoswag --spec ./swagger.yaml` or `camoswag --spec ./swagger.json`. (Replace file location with your spec file location)