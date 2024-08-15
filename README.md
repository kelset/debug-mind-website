# debug:mind website

[![Netlify Status](https://api.netlify.com/api/v1/badges/7b0584ff-9f79-4838-b56f-939a2ecb59a4/deploy-status)](https://app.netlify.com/sites/debug-mind/deploys)

Welcome to the website of my [debug:mind series](https://www.youtube.com/playlist?list=PLiD6R_aXkpLiMfS2YrhSgtSj09JJCaP2y) 🎙️🧠

This website showcase 3 main things:

- the list of debug mind episodes
- the shorts extracted from said episodes
- all the various mental health resources I've found around the web

### Good to know

- Content & illustrations (ASCII Illustrations & text) are separated into smaller html files in the `./partials` folder.
- the youtube episodes info are all stored in the `youtube-content.json` file
- Partials and Youtube content are added into the index.html by running `node predeploy.js` via `netlify.toml` on every push.

## Contributing

Check out the [dedicated doc](./CONTRIBUTING.md).

## License

The code in this repository is under [MIT License](./LICENSE).

## Credits

The version 2.0 of this website has been designed & built by [Adam Ridovics](https://adamridovics.com).
