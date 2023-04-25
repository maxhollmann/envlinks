# envlinks

A minimalist link dashboard. Configured solely using environment variables which makes it a breeze to set up in Kubernetes & co for different environments.

[Demo](https://envlinks-demo.vercel.app/)

## Usage

Not much to it: Type to filter the links, press enter to visit the first one, or tab through to another one. Escape clears the filter.

## Configuration

#### Page title

The page title is set using the `LINKS_TITLE` environment variable.

#### Links

Links have a name, URL, icon (optional), and sort index (optional). A link to this repo could be configured in various ways:

1. `LINK_1_Github_Repo = "https://github.com/maxhollmann/envlinks icon:github"`
1. `LINK_1_REPO = "https://github.com/maxhollmann/envlinks icon:github name:Github Repo"` \
   `name:` should be specified last, since it matches to the end of the string.
1. `LINK_REPO_NAME = "Github Repo"` \
   `LINK_REPO_URL = "https://github.com/maxhollmann/envlinks"` \
   `LINK_REPO_ICON = "github"` \
   `LINK_REPO_INDEX = "1"`

The icons used are the [Material Design Icons](https://pictogrammers.com/library/mdi/).


## Docker

The Docker image is available on [Docker Hub](https://hub.docker.com/r/maxhollmann/envlinks) as `maxhollmann/envlinks`.

It's recommended to use the `v0.x` tags instead of `latest` to avoid breaking changes. The current version is `v0.3`.

### Example `docker-compose.yml`

```yaml
version: '3.1'

services:
  envlinks:
    image: maxhollmann/envlinks:v0.3
    ports:
      - 5000:5000
    environment:
      LINKS_TITLE: "Test links"
      LINK_0_GOOGLE: https://google.com icon:magnify
      LINK_1_WIKIPEDIA: https://wikipedia.org icon:book-open-blank-variant
      LINK_2_envlinks_Github: https://github.com/maxhollmann/envlinks icon:github
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
