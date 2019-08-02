Based on: https://www.jannikbuschke.de/gatsby-antd-docs/

# Getting started

```
npm run start
```

Visit http://localhost:8000.

Edit files in `/content/docs` and see live updates.

# Hosting

In order to host the site the **sites path** needs to be put into gatsby-config.js export object on to the property _pathPrefix_. Then run

```
npm run build
```

and copy the content of the public folder to the webspace.
