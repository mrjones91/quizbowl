Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {

  Meteor.publish("teams", function () {
    return Teams.find();
  });
}
/*
Team {
  name
  players
  score
  games []
}
*/