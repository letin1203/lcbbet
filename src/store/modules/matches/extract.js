function extractListMatch(matchesJquery) {
  let content = $(matchesJquery);
  return extractMatches(content);
}

function extractMatches(matchList) {
  let result = [];
  jQuery.each(matchList, (index, item) => {
    if ($(item).hasClass('match')) {
      let teamRed = $(item).find('.team-1 .name').text().trim();
      let teamBlue = $(item).find('.team-2 .name').text().trim();
      if (teamRed !== "TBD" && teamBlue !== "TBD") { 
        let link = $(item).find('> a').prop('href').split('/')[7];
        let gId = link.split('-')[0];
        let date = $(item).find('.details time').attr('datetime');
        let match = {
          gId: gId,
          link: link,
          date: date,
          teamRed: teamRed,
          teamBlue: teamBlue
        };
        result.push(match); 
      }
    }
  });
  return result;
}

function extractMatch(matchJquery) {
  let content = $(matchJquery).find('.content');
  let result = {
    bestOf: content.find('.best-of').text().trim(),
    date: content.find('.match .details small').text().trim()
  };
  let teamRed = {
    link: content.find('.match .team').eq(0).find('h2 a').prop('href').split('/')[5],
    name: content.find('.match .team').eq(0).find('h2 a').text(),
    rate: content.find('#gosubetOptions .team-1 small').text().replace('%', '')
  };
  let teamBlue = {
    link: content.find('.match .team').eq(1).find('h2 a').prop('href').split('/')[5],
    name: content.find('.match .team').eq(1).find('h2 a').text(),
    rate: content.find('#gosubetOptions .team-2 small').text().replace('%', '')
  };
  result.teamRed = teamRed;
  result.teamBlue = teamBlue;
  result.result = '';
  return result;
}

export default {
  extractListMatch,
  extractMatch
};
