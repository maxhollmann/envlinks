const getSearchTerms = (query) => {
  return query
    .split(' ')
    .filter(part => part.length > 0)
    .map(part => part.toLowerCase())
}

const linkMatches = (link, query) => {
  let matches = true;
  let linkName = link.name.toLowerCase()

  getSearchTerms(query).forEach(term => {
    if (!linkName.includes(term))
      matches = false;
  })

  return matches;
}

export default (links, query) => {
  return links.filter(link => linkMatches(link, query));
}
