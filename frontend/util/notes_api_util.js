export const getNotes = (notes) => (
  $.ajax({
    url: '/api/notes/',
    method: 'GET',
    notes: notes
  })
);
