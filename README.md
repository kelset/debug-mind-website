# debug:mind website

[![Netlify Status](https://api.netlify.com/api/v1/badges/7b0584ff-9f79-4838-b56f-939a2ecb59a4/deploy-status)](https://app.netlify.com/sites/debug-mind/deploys)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)
<a href="https://github.com/kelset?tab=followers">
<img alt="follow me on github" src="https://img.shields.io/github/followers/kelset?label=Follow%20%40kelset&style=social" />
</a>
<a href="https://bsky.app/profile/kelset.dev">
<img src="https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=fff&style=flat" alt="Follow me on bsky" >
</a>

Welcome to the website of my [debug:mind series](https://www.youtube.com/playlist?list=PLiD6R_aXkpLiMfS2YrhSgtSj09JJCaP2y) 🎙️🧠

This website showcase 3 main things:

- the list of debug mind episodes
- the shorts extracted from said episodes
- all the various mental health resources I've found around the web (_originally collected into the separate repo [mental-health-resources](https://github.com/kelset/mental-health-resources)_)

### Good to know

- Content & illustrations (ASCII Illustrations & text) are separated into smaller html files in the `./partials` folder.
- the youtube episodes info are all stored in the `youtube-content.json` file
  - the shorts are ordered from the newest to the oldest
- Partials and Youtube content are added into the index.html by running `node predeploy.js` via `netlify.toml` on every push.

## Contributing

Check out the [dedicated doc](./CONTRIBUTING.md).

## License

The code in this repository is under [MIT License](./LICENSE).

## Credits

The version 2.0 of this website has been designed & built by [Adam Ridovics](https://adamridovics.com).
