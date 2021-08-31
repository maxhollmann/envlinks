export default (env) => {
  const prefixRE = /^LINK_/;
  const suffixRE = /_(URL|NAME|ICON)$/;
  const indexRE = /^(?<num>\d+)_/;

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let keys = Object.keys(env)
      .filter(key => key.match(prefixRE))
      .map(key => key.replace(prefixRE, '').replace(suffixRE, ''))
      .filter(onlyUnique);

  let links = keys.map(key => {
    let index = 999999;
    let match = key.match(indexRE);
    if (match) {
      index = parseInt(match.groups.num);
    }

    const name = env[`LINK_${key}_NAME`] || key.replace(indexRE, '').replace('_', ' ');
    const url = env[`LINK_${key}_URL`] || env[`LINK_${key}`];
    const icon = env[`LINK_${key}_ICON`];

    return { index, name, url, icon };
  });

  links = links.sort((l1, l2) => l1.index - l2.index);

  return links;
}
