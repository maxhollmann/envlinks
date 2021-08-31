export default (env) => {
  const prefix = /^LINK_/;
  const suffix = /_(URL|NAME|ICON)$/;

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let keys = Object.keys(env)
      .filter(key => key.match(prefix) && key.match(suffix))
      .map(key => key.replace(prefix, '').replace(suffix, ''))
      .filter(onlyUnique);

  return keys.map(key => {
    return {
      name: env[`LINK_${key}_NAME`],
      url: env[`LINK_${key}_URL`],
      icon: env[`LINK_${key}_ICON`],
    };
  });
}
