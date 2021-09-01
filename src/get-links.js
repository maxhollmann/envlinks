const prefixRE = /^LINK_/;
const suffixRE = /_(URL|NAME|ICON)$/;
const indexRE = /^(?<num>\d+)_/;
const iconRE = /\s+icon:(?<name>[\w\-]+)/;
const nameRE = /\s+name:(?<name>.+)/;

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

  const getIndex = () => {
    const match = key.match(indexRE);
    if (match)
      return parseInt(match.groups.num);

    return 999999;
  }

  const getIcon = () => {
    if (env[`LINK_${key}_ICON`])
      return env[`LINK_${key}_ICON`];

    const match = mainSpec.match(iconRE);
    if (match) {
      mainSpec = mainSpec.replace(iconRE, '')
      return match.groups.name;
    }
  }

  const getName = () => {
    if (env[`LINK_${key}_NAME`])
      return env[`LINK_${key}_NAME`];

    const match = mainSpec.match(nameRE);
    if (match) {
      mainSpec = mainSpec.replace(nameRE, '')
      return match.groups.name;
    }

    return key.replace(indexRE, '').replace('_', ' ');
  }

  const getURL = () => {
    if (env[`LINK_${key}_URL`])
      return env[`LINK_${key}_URL`];

    return mainSpec;
  }

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
