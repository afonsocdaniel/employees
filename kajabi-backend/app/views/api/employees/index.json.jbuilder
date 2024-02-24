json.pagination do |pagination|
  pagination.page @page
  pagination.total @total
  pagination.per_page @per_page
end
json.employees @employees