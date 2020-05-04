import _ from "lodash";
export function paginate(items, pageNo, itemsPerPage) {
  const startIndex = (pageNo - 1) * itemsPerPage;
  return _(items).slice(startIndex).take(itemsPerPage).value();
}
