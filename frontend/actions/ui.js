export const SLIDE = 'SLIDE';

export const slide = (id) => {
  console.log('SLIDING');
  return ({
    type: SLIDE,
    id: id
  });
};
