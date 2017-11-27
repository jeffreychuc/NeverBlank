export const getNotes = (notes) => (
  $.ajax({
    url: '/api/notes/',
    method: 'GET',
    notes: notes
  })
);

export const saveNote = (note) => (
  $.ajax({
    url: `/api/notes/${note.id}`,
    method: 'PATCH',
    data: { note }
  })
);
