export const getNotes = (notes) => (
  $.ajax({
    url: '/api/notes/',
    method: 'GET',
    notes: notes
  })
);

export const patchNote = (note) => (
  $.ajax({
    url: `/api/notes/${note.id}`,
    method: 'PATCH',
    data: { note: {title: note.title, body: note.body, bodypreview: note.bodypreview} }
  })
);

export const postNote = (note) => (
  $.ajax({
    url: '/api/notes/',
    method: 'POST',
    data: { note: {title: note.title, body: note.body, bodypreview: note.bodypreview} }
  })
);
