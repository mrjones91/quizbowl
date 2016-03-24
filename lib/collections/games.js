Games = new Mongo.Collection('games');

if (Meteor.isServer) {

  Meteor.publish("games", function () {
    return Games.find();
  });
}
/*
Game {
  teamA
  teamB
  scoreA
  scoreB
  date
  userId
  active
}

*/