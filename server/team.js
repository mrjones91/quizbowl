if (Meteor.isServer) {
  Meteor.methods({
    registerTeam: function(team) {
      Teams.insert(team)
    },
    editTeamName: function(team) {
      try {
        Teams.update({_id: team._id}, {$set: {name: team.name}});
      } catch(e) {
        console.log('Error: ' + e);
        return false;
      }
      return true;
    },
    editTeamMembers: function(team) {
      try {
        Teams.update({_id: team._id}, { $set: {players: team.players}});
      } catch(e) {
        console.log('Error: ' + e);
        return false;
      }
      return true;
    }

  });
}