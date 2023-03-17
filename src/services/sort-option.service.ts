const getSortOptions = (): SortOption[] => [
  {
    code: 'original_title.asc',
    name: 'Title ASC',
  },
  {
    code: 'original_title.desc',
    name: 'Title DESC',
  },
  {
    code: 'vote_average.desc',
    name: 'Vote rating DESC',
  },
  {
    code: 'vote_average.asc',
    name: 'Vote rating ASC',
  },
];

export { getSortOptions };
