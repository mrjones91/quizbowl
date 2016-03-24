GamesList = React.createClass({
  render() {
    return (
      <div>
        This is the list
        <ul>
          {this.props.gameList.map(function(value) {
            <li>{value}</li>
          })}
        </ul>
      </div>
    )
  }
})