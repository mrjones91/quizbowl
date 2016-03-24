if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Games.find().count() === 0) {
      Games.insert({"scoreA": 0, "scoreB": 0, active: true})
      console.log('game on')
    }
  });
  Meteor.methods({
    createGame: function(newGame) {
      if (!newGame || !newGame.teamA || !newGame.teamB) {
         return 'Broken';
      }
      try {
        Games.insert(newGame);

      } catch(e) {
        console.log('Error: ' + e);
        return false;
      }
      return true;
    },
    updateScore: function(scores) {
      try {
      Games.update( {active: true}, {$set: { scoreA: scores[0], scoreB: scores[1] }})
      } catch(e) {
        console.log('Error: ' + e);
        return false;
      }
      return true;
    },
    endGame: function(game) {
      try {
        Games.update( {_id: game}, {$set: {active: false}});
      } catch(e) {
        console.log('Error: ' + e);
        return false;
      }
      return true;

    },
    resetGame: function() {
      //temporary. need to use endgame for multiple users
      try {
        Games.update({active: true}, {$set: {scoreA: 0, scoreB: 0}});
      } catch (e) {
        console.log('Error: ' + e);
      }
      return true;
    }

  });
}