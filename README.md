# envlinks

## Deployment

### Using Docker

`docker run --rm -p 80:5000 --env-file .env maxhollmann/envlinks:master`

Or using `docker-compose`:

```yaml
version: '3.1'

services:
  envlinks:
    image: maxhollmann/envlinks:latest
    restart: unless-stopped
    ports:
      - 80:5000
    environment:
      LINKS_TITLE: "Test links"

      LINK_0_GOOGLE_URL: https://google.com
      LINK_0_GOOGLE_ICON: magnify

      LINK_1_WIKIPEDIA_NAME: Wikipedia
      LINK_1_WIKIPEDIA_URL: https://wikipedia.org
      LINK_1_WIKIPEDIA_ICON: book-open-blank-variant
```

### Using [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within the project folder:

```bash
npm run build
cd public
vercel deploy --name my-project
```

### Using [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```


## Development

Install the dependencies:

```bash
yarn install
```

then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running with the links provided by `.env`.
