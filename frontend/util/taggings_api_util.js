export const postTagging = (tagging) => (
  $.ajax({
    url: '/api/taggings/',
    method: 'POST',
  })
);

export const deleteTagging = (tagging) => (
  $.ajax({
    url: '/api/taggings/',
    method: 'DELETE',
  })
);
