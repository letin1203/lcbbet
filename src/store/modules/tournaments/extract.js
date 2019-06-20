function extractListTournament(tournamentsJquery) {
  let content = $(tournamentsJquery).find('#tournamentsList');
  let tournamentList = content.find('.tournament');
  return extractTournaments(tournamentList);
}

function extractTournaments(tournamentList) {
  let result = [];
  jQuery.each(tournamentList, (index, item) => {
    let name = $(item).find('.tournament-name a h3').text();
    let link = $(item).find('.tournament-name a').prop('href').split('/')[5];
    let gId = link.split('-')[0];
    let date = $(item).find('.tournament-details span').text();
    let tour = {
      name: name,
      link: link,
      gId: gId,
      date: date 
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
    commonParticipants: extractListParticipant(
      content.find('.tournament-participants .participant')
    ),
    createdAt: new Date()
  };
  return result;
}

function extractParticipant(data) {
  let title = $(data)
    .find('.name')
    .text();
  let rank = $(data)
    .find('small')
    .text();
  let logo = $(data)
    .find('.avatar')
    .prop('style')
    .cssText.split('"')[1];
  return {
    title: title,
    rank: rank,
    logo: logo
  };
}

function extractListParticipant(list) {
  let result = [];
  jQuery.each(list, (index, item) => {
    result.push(extractParticipant(item));
  });
  return result;
}

export default {
  extractListTournament,
  extractTournament
};
