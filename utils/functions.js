getMatchType = async (match) => {
  try {
    return match.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

getMatchId = async (match) => {
  try {
    return match.id;
  }
  catch(error) {
    console.log(error.response)
  }
}

getMatchCreatedAt = async (match) => {
  try {
    return match.attributes.createdAt;
  }
  catch(error) {
    console.log(error.response)
  }
}

getMatchDuration = async (match) => {
  try {
    return match.attributes.duration;
  }
  catch(error) {
    console.log(error.response)
  }
}

getMapId = async (match) => {
  try {
    return match.attributes.stats.mapID;
  }
  catch(error) {
    console.log(error.response)
  }
}

getGameTypeId = async (match) => {
  try {
    return match.attributes.stats.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

getRankingTypeId = async (match) => {
  try {
    return match.attributes.tags.rankingType;
  }
  catch(error) {
    console.log(error.response)
  }
}

getServerTypeId = async (match) => {
  try {
    return match.attributes.tags.serverType;
  }
  catch(error) {
    console.log(error.response)
  }
}

getRoster1Id = async (match) => {
  try {
    return match.relationships.rosters.data[0].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

getRoster2Id = async (match) => {
  try {
    return match.relationships.rosters.data[1].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

getParticipantsRoster1Ids = async (roster1, fakeData) => {
  try {
    const getParticipantsRoster1Ids = fakeData.included.filter(function( obj ) {
        return obj.type == 'roster' && obj.id == roster1;
    });
    return getParticipantsRoster1Ids[0].relationships.participants.data
  }
  catch(error) {
    console.log(error.response)
  }
}

getParticipantsRoster2Ids = async (roster2, fakeData) => {
  try {
    const getParticipantsRoster2Ids = fakeData.included.filter(function( obj ) {
        return obj.type == 'roster' && obj.id == roster2;
    });
    return getParticipantsRoster2Ids[0].relationships.participants.data
  }
  catch(error) {
    console.log(error.response)
  }
}

main = async (match, fakeData) => {
  try {
    const type = getMatchType(match);
    const id = getMatchId(match);
    const createdAt = getMatchCreatedAt(match);
    const duration = getMatchDuration(match);
    const mapID = getMapId(match);
    const gameType = getGameTypeId(match);
    const rankingType = getRankingTypeId(match);
    const serverType = getServerTypeId(match);
    const roster1 = getRoster1Id(match);
    const roster2 = getRoster2Id(match);
    const participantsRoster1 = getParticipantsRoster1Ids(await roster1, fakeData);
    const participantsRoster2 = getParticipantsRoster2Ids(await roster2, fakeData);

    const datasMatch =
      {
        type: await type,
        id: await id,
        createdAt: await createdAt,
        duration: await duration,
        mapID: await mapID,
        gameType: await gameType,
        rankingType: await rankingType,
        serverType: await serverType,
        roster1Id: await roster1,
        roster2Id: await roster2,
        participantsRoster1: await participantsRoster1,
        participantsRoster2: await participantsRoster2,
      };


    const newMatch = new Match(
      datasMatch
    );

    newMatch.save((err, savedMatch) => {
      if (err) {
        console.error(err);
        return err;
      }
      console.log(savedMatch);
    });


  }
  catch(error) {
    console.log(error.response)
  }
}

module.exports = {
  getMatchType: getMatchType,
  getMatchId: getMatchId,
  getMatchCreatedAt: getMatchCreatedAt,
  getMatchDuration: getMatchDuration,
  getMapId: getMapId,
  getGameTypeId: getGameTypeId,
  getRankingTypeId: getRankingTypeId,
  getServerTypeId: getServerTypeId,
  getRoster1Id: getRoster1Id,
  getRoster2Id: getRoster2Id,
  getParticipantsRoster1Ids: getParticipantsRoster1Ids,
  getParticipantsRoster2Ids: getParticipantsRoster2Ids,
  main: main
}
