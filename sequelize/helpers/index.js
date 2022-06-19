export function paginate(query, page, limit) {
  const offset = page * limit;
  return {
    ...query,
    offset,
    limit,
  };
}
