const test = require('tape');
const path = require('path');
const { getProfileNames, extract, contract, datastore } = require('./');

const extractPath = path.join(__dirname, 'data', 'monaco.osm.pbf');
const profileName = 'car';

test('getProfileNames', async t => {
  try {
    const profileNames = await getProfileNames();
    t.ok(profileNames.length > 0);
  } catch (error) {
    t.fail(error.message);
  }

  t.end();
});

test('extract', async t => {
  try {
    const graphPath = await extract(extractPath, profileName);
    t.ok(graphPath);
  } catch (error) {
    t.fail(error.message);
  }

  t.end();
});

test('contract', async t => {
  try {
    const graphPath = await extract(extractPath, profileName);
    t.ok(graphPath);

    const graphPath2 = await contract(graphPath);
    t.ok(graphPath2);
  } catch (error) {
    t.fail(error.message);
  }

  t.end();
});

test('datastore', async t => {
  try {
    const graphPath = await extract(extractPath, profileName);
    t.ok(graphPath);

    const graphPath2 = await contract(graphPath);
    t.ok(graphPath2);

    const graphPath3 = await datastore(graphPath);
    t.ok(graphPath3);
  } catch (error) {
    t.fail(error.message);
  }

  t.end();
});
