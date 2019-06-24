function convertTournament(firestoreModel) {
  let data = firestoreModel.data();
  let result = {
    id: firestoreModel.id,
    name: data.name,
    date: data.date,
    link: data.link,
    gId: data.gId,
    points: data.points,
    createdBy: data.createdBy,
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
