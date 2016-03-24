App = React.createClass({
  componentWillMount() {
      return (
        <LoadingSpinner/>
      )
  },
    render() {
        return (
          <div>
            <Game/>
          </div>
        )
    }
});