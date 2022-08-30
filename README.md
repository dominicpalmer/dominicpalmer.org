# Personal Site - <a href="https://www.dominicpalmer.org">dominicpalmer.org</a>

![License](https://img.shields.io/github/license/dominicpalmer/dominicpalmer.org)

## Summary

This repo is home to my personal website, <a href="https://www.dominicpalmer.org">dominicpalmer.org</a>. It's a fork of a Jekyll theme named <a href="https://github.com/mmistakes/minimal-mistakes">Minimal Mistakes</a>, and is hosted with GitHub Pages.

## Design

The site is backed by Jekyll, a static site generator. Although static site generation is often aimed at translation of markdown into HTML, I structured page content using HTML from the outset, with SCSS and plain JavaScript for styling and aesthetic features.

To get syntax highlighting of code blocks, I used an awesome framework called <a href="https://highlightjs.org/">highlight.js</a>. The highlighting colour theme used site-wide is <a href="https://github.com/morhetz/gruvbo">gruvbox</a>.

## Dependencies

Firstly, you'll need Jekyll's dependencies:

- Ruby, version 2.5.0+
- RubyGems
- GCC and Make (i.e. `build-essentials`)

Then per Jekyll's <a href="https://jekyllrb.com/docs/">docs</a>, you'll need the Jekyll and Bundler gems:

```Bash
gem install jekyll bundler
```

## Local Build and Deployment

Clone the repo:

```bash
git clone https://github.com/dominicpalmer/dominicpalmer.org.git
```

Then at the repository root:

```bash
bundle exec jekyll serve
```

## Scripts

By default, changing structure or styling source files once a local deployment is up and running will trigger a re-generation of the affected resources. Only a page refresh is then needed to see the changes reflected in the browser.

To see changes to scripts reflected in real time, you need to first bundle and minify them. After making a change to anything in **./assets/js**, re-build and minify via:

```bash
npm run build:js
```

Or to re-build everything except jQuery:

```bash
npm run main:js
```

Once run, the local server will recognise there has been a change to the source and will re-generate as before.

## License

MIT licensed.
