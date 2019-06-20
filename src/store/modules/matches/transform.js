function convertItem(firestoreModel) {
  let data = firestoreModel.data();
  let result = {
    id: firestoreModel.id,
    tournament: data.tournament,
    bestOf: data.bestOf,
    date: data.date,
    link: data.link,
    gId: data.gId,
    teamRed: data.teamRed,
    teamBlue: data.teamBlue,
    result: data.result || '',
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
