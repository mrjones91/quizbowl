Game = React.createClass({
  getInitialState() {
     return { buzzed: false, player: '', turnover: false }
  },
  componentDidMount() {
    var gameArray = Games.find({}).fetch();
    console.log(gameArray);
  },
  buzz(e) {
    console.log(e.keyCode);
    //TeamA = A = 65
    //TeamB = B = 70
    if (e.keyCode == 65) {
      if (!this.state.buzzed) {
        this.state.buzzed = true;
        this.state.player = 'A';
        $('.ba').addClass('activeButton');
      }
    } else if (e.keyCode == 70) {
      if (!this.state.buzzed) {
        this.state.buzzed = true;
        this.state.player = 'B';
         $('.bb').addClass('activeButton');
      }
    }

  },
  addPoints(event) {
    if (this.state.buzzed) {
      if (event.target.classList.contains('activeButton')) { //

        if (this.state.player == 'A') {
          var newScore = this.data.theGame.scoreA;
          newScore += 10;
          var scores = [newScore, this.data.theGame.scoreB];
          Meteor.call("updateScore", scores, function(err, res) {
            if (err) {
              console.log('Error: ' + err);
            }
            console.log(res);
          })
        } else if (this.state.player == 'B') {
          var newScore = this.data.theGame.scoreB;
          newScore += 10;
          var scores = [this.data.theGame.scoreA, newScore];
          Meteor.call("updateScore", scores, function(err, res) {
            if (err) {
              console.log('Error: ' + err);
            }
            console.log(res);
          })
        }

        $('.ba').removeClass('activeButton');
        $('.bb').removeClass('activeButton');
        this.state.turnover = false;
        this.state.buzzed = false;
        this.state.player = '';

      } else if (!this.state.turnover) { //Buzzer is wrong. Other team goes
        this.state.buzzed = false;
         this.state.turnover = true;
        if (this.state.player == 'A') {
          $('.ba').removeClass('activeButton');
          //jQuery.event.trigger({ type : 'keypress', which :70 })
        } else if (this.state.player == 'B') {
          $('.bb').removeClass('activeButton');
          //jQuery.event.trigger({ type : 'keypress', which : 65 })
        }


      }
    }
  },
  openResetModal() {
    $('#modalreset').openModal();
  },
  handleReset(event) {

      Meteor.call('resetGame', function(err, res) {
        if (err) {
          console.log('Error: ' + err);
        }
        console.log('Game Reset');
      });


  },
  handleInfo(event) {
     Materialize.toast('Brought to you by dijital Technologies - www.dij.io', 4000)
  },
  clearQuestion(event) {
        $('.ba').removeClass('activeButton');
        $('.bb').removeClass('activeButton');
        this.state.turnover = false;
        this.state.buzzed = false;
        this.state.player = '';

  },
  mixins: [ReactMeteorData],
  getMeteorData() {
     // This is the place to subscribe to any data you need
    var handle =  Meteor.subscribe('games', {active: true});

    return {
      isLoading: ! handle.ready(), // Use handle to show loading state
      theGame: Games.findOne({active: true})
    };
  },

  render() {
    if (this.data.isLoading) {
      return (<LoadingSpinner />);
    }
    window.onkeydown = this.buzz;
    return(
      <div className="container">
        <div>


          <div className="ta"><TeamScore name="TeamA" score={this.data.theGame.scoreA} /></div>
          <div className="tb"><TeamScore name="TeamB" score={this.data.theGame.scoreB} /></div>
          <div className="ba" onClick={this.addPoints}><TeamButton name="TeamA" color="red"/></div>
          <div className="bb" onClick={this.addPoints}><TeamButton name="TeamB" color="blue"/></div>
        </div>

        <div id="manageBtns" className="row">
          <a className="col offset-s4 waves-effect waves-light btn valign black white-text modal-trigger" onClick={this.openResetModal}>RESET GAME</a>
          <a className="col offset-s1 waves-effect waves-light btn valign black white-text" onClick={this.handleInfo}>Info</a>
          <a className="col s8 offset-s2 waves-effect waves-light btn valign orange white-text" onClick={this.clearQuestion}>CLEAR QUESTION</a>
        </div>
      <div id="modalreset" className="modal">
        <div className="modal-content">
          <h3>Are you sure you want to quit the game?</h3>
        </div>
        <div className="modal-footer">
          <a onClick={this.handleReset} href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Yes</a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">or Nah</a>
        </div>
  </div>
      </div>
    )
  }
})