import FilterLinks from './filter-links';

describe('filterLinks', () => {
  const link1 = { name: 'Link Number 1' };
  const link2 = { name: 'StackOverflow' };
  const link3 = { name: 'Physics Stack Exchange' };
  const link4 = { name: 'Emacs Stack Exchange' };

  const links = [link1, link2, link3, link4];

  const filtered = FilterLinks(links);

  describe('without a search term', () => {
    it('returns all links', () => {
      expect(filtered('')).toEqual(links)
      expect(filtered('  ')).toEqual(links)
    })
  })

  describe('with a single search term', () => {
    it('returns the correct result', () => {
      expect(filtered('numb')).toIncludeSameMembers([link1])
    })

    it('returns all matches', () => {
      expect(filtered('stack')).toIncludeSameMembers([link2, link3, link4])
    })
  })

  describe('multiple search terms', () => {
    it('returns all matches', () => {
      expect(filtered('sta exchang')).toIncludeSameMembers([link3, link4])
    })
  })

  describe('with superfluous spaces', () => {
    it('returns all matches', () => {
      expect(filtered('  sta  exchang   ')).toIncludeSameMembers([link3, link4])
    })
  })
})
