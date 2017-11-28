export const getNotebooks = (notebooks) => (
  $.ajax({
    url: '/api/notebooks/',
    method: 'GET',
    notebooks: notebooks
  })
);

export const patchNotebook = (notebook) => (
  $.ajax({
    url: `/api/notes/${notebook.id}`,
    method: 'PATCH',
    data: { notebook: {title: notebook.title} }
  })
);

export const postNotebook = (notebook) => (
  $.ajax({
    url: '/api/notebooks/',
    method: 'POST',
    data: { note: {title: notebook.title} }
  })
);

export const deleteNotebook = (id) => (
  $.ajax({
    url: `api/notebooks/${id}`,
    method: 'DELETE'
  })
);
