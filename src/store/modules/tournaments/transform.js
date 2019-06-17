function convertTournament(firestoreModel) {
  let data = firestoreModel.data();
  let result = {
    id: firestoreModel.id,
    imgUrl: data.imgUrl,
    title: data.title,
    info: data.info,
    createdAt: data.createdAt
  };
  return result;
}

function convertListTournament(listFirestoreModel) {
  let result = [];
  listFirestoreModel.forEach(item => {
    result.push(convertTournament(item));
  });
  return result;
}

export default {
  convertListTournament
};
