NewGame = React.createClass({
  getInitialState: function() {
    return {games: 0};
  },
  handleClick(event) {
    var newGame = {
      teamA: 'popes',
      teamB: 'dopes',
      scoreA: 0,
      scoreB: 0,
      date: new Date(),
      userId: 'anon',
      active: true
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
    Meteor.call('createGame', newGame, function(err, res) {
      if (err) {
        console.log('Error: ' + err);
      } else {
        console.log('Result: ' + res);
        //this.setState({games: this.state.games++});
      }
    });
  },
  componentDidMount() {

  },
  render() {
    return (
      <div>
        <input id="newGameBtn" type="button" value="New Game!" onClick={this.handleClick}  />
        <p>{this.props.currentGames}</p>
      </div>
    )
  }
})