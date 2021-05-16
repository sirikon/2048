# 2048 clone

Developed for the lolz, wanted to make a little game without
engines/libs/frameworks to do so.

It uses no external runtime dependencies, and uses my own opinionated tool for
building frontend applications: [Teseract](https://github.com/sirikon/teseract)

## Requirements

- Node JS ([ASDF VM](https://asdf-vm.com/) with [NodeJS plugin](https://github.com/asdf-vm/asdf-nodejs.git) is recommended).

## Development

```bash
# Install required dependencies
npm install

# Run development server
npm start
# Visit http://127.0.0.1:8080 on your browser.

# Create a release build
npm run release
# Output will be generated in 'dist' folder.
```
