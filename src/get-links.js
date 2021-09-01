const prefixRE = /^LINK_/;
const suffixRE = /_(URL|NAME|ICON|INDEX)$/;
const indexRE = /^(\d+)_/;
const iconRE = /\s+icon:([\w\-]+)/;
const nameRE = /\s+name:(.+)/;

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

const getKeys = (env) => {
  return Object.keys(env)
    .filter(key => key.match(prefixRE))
    .map(key => key.replace(prefixRE, '').replace(suffixRE, ''))
    .filter(onlyUnique);
}

const createLink = (env, key) => {
  let mainSpec = env[`LINK_${key}`];

  const first = (steps) => () => {
    let match;

    steps.some(step => {
      match = step();
      return typeof(match) !== 'undefined';
    })

    return match
  }

  const fromVarWithSuffix = (suffix) => () => {
    return env[`LINK_${key}_${suffix}`];
  }

  const extractFromMainSpec = (regex) => () => {
    const match = mainSpec && mainSpec.match(regex);
    if (match) {
      mainSpec = mainSpec.replace(regex, '')
      return match[1];
    }
  }

  const toInt = (func) => () => {
    const s = func();
    if (typeof(s) !== 'undefined')
      return parseInt(s)
  }

  const getIndex = first([
    toInt(fromVarWithSuffix('INDEX')),
    toInt(() => {
      const match = key.match(indexRE);
      if (match)
        return match[1];
    }),
    () => 999999,
  ])

  const getIcon = first([
    fromVarWithSuffix('ICON'),
    extractFromMainSpec(iconRE),
  ])

  const getName = first([
    fromVarWithSuffix('NAME'),
    extractFromMainSpec(nameRE),
    () => key.replace(indexRE, '').replace('_', ' '),
  ])

  const getURL = first([
    fromVarWithSuffix('URL'),
    () => mainSpec,
  ])


  const index = getIndex();
  const icon = getIcon();
  const name = getName();
  const url = getURL();

  return { index, name, url, icon };
}

export default (env) => {
  const keys = getKeys(env);
  return keys
    .map(key => createLink(env, key))
    .sort((l1, l2) => l1.index - l2.index);
}
