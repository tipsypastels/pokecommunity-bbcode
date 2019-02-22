const { usergroupTest, usergroupTestAll } = require('./testHelper');

usergroupTestAll(
  'admin',
  'bss',
  'daily',
  'developer',
  'fangames',
  'moderoid',
  'owner',
);

// can't auto test, different class name
usergroupTest('smt', 'pr');
usergroupTest('crystaltier', 't3');
usergroupTest('platinumtier', 't4');