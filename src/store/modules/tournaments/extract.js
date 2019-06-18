function extractListTournament(tournamentsJquery) {
  let content = $(tournamentsJquery).find('#tournamentsList');
  let tournamentList = content.find('.tournament');
  return extractTournaments(tournamentList);
}

function extractTournaments(tournamentList) {
  let result = [];
  jQuery.each(tournamentList, (index, item) => {
    let tour = {
      name: $(item)
        .find('.tournament-name a h3')
        .text(),
      link: $(item)
        .find('.tournament-name a')
        .prop('href')
        .split('/')[5],
      date: $(item)
        .find('.tournament-details span')
        .text()
    };
    result.push(tour);
  });
  return result;
}

function extractTournament(tournamentJquery) {
  let content = $(tournamentJquery).find('.content');
  let result = {
    name: content.find('.tournament-name').text(),
    date: content.find('.apex-info.cell li:first-child').text(),
    participantsLink: content
      .find('.tournament-participants .button.green.arrow')
      .text(),
    commonParticipants: content.find('.tournament-participants .participant'),
    createdAt: new Date()
  };
  return result;
}

export default {
  extractListTournament,
  extractTournament
};
