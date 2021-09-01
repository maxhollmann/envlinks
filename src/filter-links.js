import Fuse from 'fuse.js'


export default (links) => {
  const options = {
    includeScore: true,
    keys: ['name'],
  }

  const fuse = new Fuse(links, options);

  return query => {
    query = query.trim();

    if (query == '')
      return links;
    else
      return fuse.search(query).map(res => res.item)
  };
}
