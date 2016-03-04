import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['_active'],

  init() {
    this._super( ...arguments );
    this.set('childLinkViews', Ember.A());
  },

  didRender() {
    this._super( ...arguments );
    Ember.run.schedule('afterRender', this, function() {
      let childLinkElements = this.$('a.ember-view');

      let childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));
    });
  },

  hasActiveLinks: Ember.computed('childLinkViews.@each.active', function(){
    return this.get('childLinkViews').isAny('active');
  }),

  activeClass: Ember.computed('childLinkViews.@each.active', function(){
    let activeLink = this.get('childLinkViews').findBy('active');
    return (activeLink ? activeLink.get('active') : 'active');
  }),

  _active: Ember.computed('hasActiveLinks', 'activeClass', function(){
    return (this.get('hasActiveLinks') ? this.get('activeClass') : false);
  })

});
