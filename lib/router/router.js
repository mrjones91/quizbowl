FlowRouter.route('/', {
  action: () => {
    ReactLayout.render(App);
  },
  subscriptions: function() {
    this.register('games', Meteor.subscribe('games'));
    this.register('teams', Meteor.subscribe('teams'));
    }
})