TeamScore = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col s12"> <h2>{this.props.name}</h2> </div>
        <div className="col s4 offset-s4"> <h2>{this.props.score}</h2> </div>
      </div>
    )
  }
})