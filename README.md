# envlinks

## Deployment using Docker

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
      LINK_0_GOOGLE: https://google.com icon:magnify
      LINK_1_WIKIPEDIA: https://wikipedia.org icon:book-open-blank-variant
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
