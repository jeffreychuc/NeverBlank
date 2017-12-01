export const postTagging = (tagging) => (
  $.ajax({
    url: '/api/taggings/',
    method: 'POST',
    data: { tagging }
  })
);

export const deleteTagging = (tagging) => (
  $.ajax({
    url: '/api/taggings/',
    method: 'DELETE',
  })
);
