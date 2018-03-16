exports.getMatchType = async (match) => {
  try {
    return match.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getMatchId = async (match) => {
  try {
    return match.id;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getMatchCreatedAt = async (match) => {
  try {
    return match.attributes.createdAt;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getMatchDuration = async (match) => {
  try {
    return match.attributes.duration;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getMapId = async (match) => {
  try {
    return match.attributes.stats.mapID;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getGameTypeId = async (match) => {
  try {
    return match.attributes.stats.type;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getRankingTypeId = async (match) => {
  try {
    return match.attributes.tags.rankingType;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getServerTypeId = async (match) => {
  try {
    return match.attributes.tags.serverType;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getRoster1Id = async (match) => {
  try {
    return match.relationships.rosters.data[0].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getRoster2Id = async (match) => {
  try {
    return match.relationships.rosters.data[1].id;
  }
  catch(error) {
    console.log(error.response)
  }
}

exports.getParticipantsRoster1Ids = async (roster1, fakeData) => {
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

exports.getParticipantsRoster2Ids = async (roster2, fakeData) => {
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

exports.main = async (match, fakeData) => {
  try {
    const type = fns.getMatchType(match);
    const id = fns.getMatchId(match);
    const createdAt = fns.getMatchCreatedAt(match);
    const duration = fns.getMatchDuration(match);
    const mapID = fns.getMapId(match);
    const gameType = fns.getGameTypeId(match);
    const rankingType = fns.getRankingTypeId(match);
    const serverType = fns.getServerTypeId(match);
    const roster1 = fns.getRoster1Id(match);
    const roster2 = fns.getRoster2Id(match);
    const participantsRoster1 = fns.getParticipantsRoster1Ids(await roster1, fakeData);
    const participantsRoster2 = fns.getParticipantsRoster2Ids(await roster2, fakeData);

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
