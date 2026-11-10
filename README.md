# XARF Website

Official website for the eXtended Abuse Reporting Format (XARF) v4.2.

## 🌐 Live Site

- **GitHub Pages**: https://xarf.github.io/website/
- **Future Domain**: Will be moved to custom domain (xarf.org)

## 🏗️ Architecture

This Jekyll website provides:

- **Professional Homepage**: Marketing and overview content
- **Interactive Tools**: Schema validator, sample generator, format converter
- **Parser Libraries**: SDK documentation for JavaScript/TypeScript, Go, C#/.NET, and Python (4 published libraries)
- **Documentation**: User guides, technical specs, best practices
- **Community Hub**: Contributing guides, changelog, support resources

## 📁 Structure

```
├── _docs/              # Documentation pages
├── _tools/             # Interactive tool pages  
├── _libraries/         # Parser library documentation
├── _community/         # Community resources
├── downloads/          # Download packages
├── _layouts/           # Jekyll layouts
├── _includes/          # Reusable components
├── _sass/              # SCSS stylesheets
└── assets/             # Static assets
```

## 🔄 Content Sync

Documentation content is automatically synchronized from the [xarf-spec repository](https://github.com/xarf/xarf-spec) to maintain a single source of truth for technical specifications.

## 🚀 Development

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.