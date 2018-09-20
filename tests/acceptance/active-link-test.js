import { click, findAll, currentPath, visit } from '@ember/test-helpers';
import { run, later } from '@ember/runloop';
import {
  module,
  test
} from 'qunit';

import startApp from '../helpers/start-app';

var application;

module('Acceptance: ActiveLink', function(hooks) {
  hooks.beforeEach(function() {
    application = startApp();
  });

  hooks.afterEach(function() {
    run(application, 'destroy');
  });

  test('component should show correct active state', async function(assert) {
    await visit('/');

    assert.equal(currentPath(), 'index');
    assert.dom('#index-link li.active').exists({ count: 1 });
    assert.dom('#index-link li.active a.active').exists({ count: 1 });
    assert.dom('#other-link li.active').doesNotExist();
    assert.dom('#other-link li.active a.active').doesNotExist();

    await click('#other-link a');

    assert.equal(currentPath(), 'other');
    assert.dom('#index-link li.active').doesNotExist();
    assert.dom('#index-link li.active a.active').doesNotExist();
    assert.dom('#other-link li.active').exists({ count: 1 });
    assert.dom('#other-link li.active a.active').exists({ count: 1 });
  });

  test('component should show correct disabled state', async function(assert) {
    await visit('/');

    assert.equal(currentPath(), 'index');
    assert.dom('#index-link-disabled li.disabled').exists({ count: 1 });
    assert.dom('#index-link-disabled li.disabled a.disabled').exists({ count: 1 });
  });

  test('changed active class should be applied to the proper elements', async function(assert) {
    await visit('/');

    assert.equal(currentPath(), 'index');
    assert.dom('#linkto-active-class li.enabled').exists({ count: 1 });
    assert.dom('#linkto-active-class a.enabled').exists({ count: 1 });
    assert.dom('#activelink-active-class li.enabled').exists({ count: 1 });
    assert.dom('#activelink-active-class a.active').exists({ count: 1 });
  });

  test('changed disabled class should be applied to the proper elements', async function(assert) {
    await visit('/');

    assert.equal(currentPath(), 'index');
    assert.dom('#linkto-disabled-class li.inactive').exists({ count: 1 });
    assert.dom('#linkto-disabled-class a.inactive').exists({ count: 1 });
    assert.dom('#activelink-disabled-class li.inactive').exists({ count: 1 });
    assert.dom('#activelink-disabled-class a.disabled').exists({ count: 1 });
  });

  test('change the linkSelector to look for a button', async function(assert) {
    await visit('/');

    assert.equal(currentPath(), 'index');
    assert.dom('#button-links li.active').exists({ count: 1 });
    assert.dom('#button-links li.active button.active').exists({ count: 1 });
  });

  test('transitioning in and out classes', async function(assert) {
    await visit('/');

    find('#other-link a').click();

    let done = assert.async();

    // need to wait for ember to have a chance to add the classes :)
    later(() => {
      assert.dom('#other-link li.ember-transitioning-in').exists({ count: 1 });
      assert.dom('#index-link li.ember-transitioning-out').exists({ count: 1 });
      done();
    }, 1);
  });
});
