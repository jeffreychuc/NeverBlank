export const getTags = () => (
  $.ajax({
    url: '/api/tags',
    method: 'GET'
  })
);

export const postTag = (tag) => (
  $.ajax({
    url: '/api/tags',
    method: 'GET',
    data: { tag }
  })
);

export const getTag = (noteId) => (
  $.ajax({
    url: `/api/tags/${noteId}`,
    method: 'GET'
  })
);

export const patchTag = (tag) => (
  $.ajax({
    url: `/api/tags/${tag.id}`,
    method: 'PATCH',
    data: { tag }
  })
);

export const deleteTag = (tagId) => (
  $.ajax({
    url: `/api/tags/${tagId}`,
    method: 'DELETE'
  })
);
