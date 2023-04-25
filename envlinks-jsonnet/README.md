This directory contains jsonnet helpers to configure envlinks instances.

### Installation

Using [jsonnet-bundler](https://github.com/jsonnet-bundler/jsonnet-bundler):

```bash
jb install git@github.com:maxhollmann/envlinks.git/envlinks-jsonnet@v0.3.1
```

### Usage

```jsonnet
local envlinks = import 'envlinks-jsonnet/helpers.libsonnet';

local env = envlinks.config(
  title='My links',
  links=[
    envlinks.link('Google', 'https://google.com', icon='google'),
    envlinks.link('Wikipedia', 'https://wikipedia.com', icon='wikipedia'),
  ],
);
```

`env` now contains an object with environment variables that can be used with e.g. [k8s-libsonnet's withEnvMap](https://jsonnet-libs.github.io/k8s-libsonnet/1.26/core/v1/container/#fn-withenvmap).

`envlinks.config` automatically adds `LINK_*_INDEX` variables to keep the order of the links as given in the `links` array.
