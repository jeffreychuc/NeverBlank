export const getNotes = (notes) => (
  $.ajax({
    url: '/api/notes/',
    method: 'GET',
    notes: notes
  })
);

export const patchNote = (note) => {
  // 
  return ($.ajax({
    url: `/api/notes/${note.id}`,
    method: 'PATCH',
    data: { note: {title: note.title, body: note.body, bodypreview: note.bodypreview, notebook_id: note.notebook_id} }
  }));
};

export const postNote = (note) => (
  $.ajax({
    url: '/api/notes/',
    method: 'POST',
    data: { note: {title: note.title, body: note.body, bodypreview: note.bodypreview, notebook_id: note.notebook_id} }
  })
);

export const deleteNote = (id) => (
  $.ajax({
    url: `api/notes/${id}`,
    method: 'DELETE'
  })
);

export const getNoteTags = (id) => (
  $.ajax({
    url: `/api/notes/${id}`,
    method: 'GET',
  })
);
