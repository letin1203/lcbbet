function convertItem(firestoreModel) {
  let data = firestoreModel.data();
  let result = {
    id: firestoreModel.id,
    tournament: data.tournament,
    createdBy: data.createdBy,
    createdAt: data.createdAt
  };
  return result;
}

function convertListItem(listFirestoreModel) {
  let result = [];
  listFirestoreModel.forEach(item => {
    result.push(convertItem(item));
  });
  return result;
}

export default {
  convertListItem,
  convertItem
};
