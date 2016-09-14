var tap = require('tap');
var test = tap.test;
var semver = require('../semver.js');
var gtr = semver.gtr;

test('\ngtr tests', function(t) {
  // [range, version, loose]
  // Version should be greater than range
  [
    ['~1.2.2', '1.3.0'],
    ['~0.6.1-1', '0.7.1-1'],
    ['1.0.0 - 2.0.0', '2.0.1'],
    ['1.0.0', '1.0.1-beta1'],
    ['1.0.0', '2.0.0'],
    ['<=2.0.0', '2.1.1'],
    ['<=2.0.0', '3.2.9'],
    ['<2.0.0', '2.0.0'],
    ['0.1.20 || 1.2.4', '1.2.5'],
    ['2.x.x', '3.0.0'],
    ['1.2.x', '1.3.0'],
    ['1.2.x || 2.x', '3.0.0'],
    ['2.*.*', '5.0.1'],
    ['1.2.*', '1.3.3'],
    ['1.2.* || 2.*', '4.0.0'],
    ['2', '3.0.0'],
    ['2.3', '2.4.2'],
    ['~2.4', '2.5.0'], // >=2.4.0 <2.5.0
    ['~2.4', '2.5.5'],
    ['~>3.2.1', '3.3.0'], // >=3.2.1 <3.3.0
    ['~1', '2.2.3'], // >=1.0.0 <2.0.0
    ['~>1', '2.2.4'],
    ['~> 1', '3.2.3'],
    ['~1.0', '1.1.2'], // >=1.0.0 <1.1.0
    ['~ 1.0', '1.1.0'],
    ['<1.2', '1.2.0'],
    ['< 1.2', '1.2.1'],
    ['1', '2.0.0beta', true],
    ['~v0.5.4-pre', '0.6.0'],
    ['~v0.5.4-pre', '0.6.1-pre'],
    ['=0.7.x', '0.8.0'],
    ['=0.7.x', '0.8.0-asdf'],
    ['<0.7.x', '0.7.0'],
    ['~1.2.2', '1.3.0'],
    ['1.0.0 - 2.0.0', '2.2.3'],
    ['1.0.0', '1.0.1'],
    ['<=2.0.0', '3.0.0'],
    ['<=2.0.0', '2.9999.9999'],
    ['<=2.0.0', '2.2.9'],
    ['<2.0.0', '2.9999.9999'],
    ['<2.0.0', '2.2.9'],
    ['2.x.x', '3.1.3'],
    ['1.2.x', '1.3.3'],
    ['1.2.x || 2.x', '3.1.3'],
    ['2.*.*', '3.1.3'],
    ['1.2.*', '1.3.3'],
    ['1.2.* || 2.*', '3.1.3'],
    ['2', '3.1.2'],
    ['2.3', '2.4.1'],
    ['~2.4', '2.5.0'], // >=2.4.0 <2.5.0
    ['~>3.2.1', '3.3.2'], // >=3.2.1 <3.3.0
    ['~1', '2.2.3'], // >=1.0.0 <2.0.0
    ['~>1', '2.2.3'],
    ['~1.0', '1.1.0'], // >=1.0.0 <1.1.0
    ['<1', '1.0.0'],
    ['1', '2.0.0beta', true],
    ['<1', '1.0.0beta', true],
    ['< 1', '1.0.0beta', true],
    ['=0.7.x', '0.8.2'],
    ['<0.7.x', '0.7.2']
  ].forEach(function(tuple) {
    var range = tuple[0];
    var version = tuple[1];
    var loose = tuple[2] || false;
    var msg = 'gtr(' + version + ', ' + range + ', ' + loose + ')';
    t.ok(gtr(version, range, loose), msg);
  });
  t.end();
});

test('\nnegative gtr tests', function(t) {
  // [range, version, loose]
  // Version should NOT be greater than range
  [
    ['~0.6.1-1', '0.6.1-1'],
    ['1.0.0 - 2.0.0', '1.2.3'],
    ['1.0.0 - 2.0.0', '0.9.9'],
    ['1.0.0', '1.0.0'],
    ['>=*', '0.2.4'],
    ['', '1.0.0', true],
    ['*', '1.2.3'],
    ['*', 'v1.2.3-foo'],
    ['>=1.0.0', '1.0.0'],
    ['>=1.0.0', '1.0.1'],
    ['>=1.0.0', '1.1.0'],
    ['>1.0.0', '1.0.1'],
    ['>1.0.0', '1.1.0'],
    ['<=2.0.0', '2.0.0'],
    ['<=2.0.0', '1.9999.9999'],
    ['<=2.0.0', '0.2.9'],
    ['<2.0.0', '1.9999.9999'],
    ['<2.0.0', '0.2.9'],
    ['>= 1.0.0', '1.0.0'],
    ['>=  1.0.0', '1.0.1'],
    ['>=   1.0.0', '1.1.0'],
    ['> 1.0.0', '1.0.1'],
    ['>  1.0.0', '1.1.0'],
    ['<=   2.0.0', '2.0.0'],
    ['<= 2.0.0', '1.9999.9999'],
    ['<=  2.0.0', '0.2.9'],
    ['<    2.0.0', '1.9999.9999'],
    ['<\t2.0.0', '0.2.9'],
    ['>=0.1.97', 'v0.1.97'],
    ['>=0.1.97', '0.1.97'],
    ['0.1.20 || 1.2.4', '1.2.4'],
    ['0.1.20 || >1.2.4', '1.2.4'],
    ['0.1.20 || 1.2.4', '1.2.3'],
    ['0.1.20 || 1.2.4', '0.1.20'],
    ['>=0.2.3 || <0.0.1', '0.0.0'],
    ['>=0.2.3 || <0.0.1', '0.2.3'],
    ['>=0.2.3 || <0.0.1', '0.2.4'],
    ['||', '1.3.4'],
    ['2.x.x', '2.1.3'],
    ['1.2.x', '1.2.3'],
    ['1.2.x || 2.x', '2.1.3'],
    ['1.2.x || 2.x', '1.2.3'],
    ['x', '1.2.3'],
    ['2.*.*', '2.1.3'],
    ['1.2.*', '1.2.3'],
    ['1.2.* || 2.*', '2.1.3'],
    ['1.2.* || 2.*', '1.2.3'],
    ['1.2.* || 2.*', '1.2.3'],
    ['*', '1.2.3'],
    ['2', '2.1.2'],
    ['2.3', '2.3.1'],
    ['~2.4', '2.4.0'], // >=2.4.0 <2.5.0
    ['~2.4', '2.4.5'],
    ['~>3.2.1', '3.2.2'], // >=3.2.1 <3.3.0
    ['~1', '1.2.3'], // >=1.0.0 <2.0.0
    ['~>1', '1.2.3'],
    ['~> 1', '1.2.3'],
    ['~1.0', '1.0.2'], // >=1.0.0 <1.1.0
    ['~ 1.0', '1.0.2'],
    ['>=1', '1.0.0'],
    ['>= 1', '1.0.0'],
    ['<1.2', '1.1.1'],
    ['< 1.2', '1.1.1'],
    ['1', '1.0.0beta', true],
    ['~v0.5.4-pre', '0.5.5'],
    ['~v0.5.4-pre', '0.5.4'],
    ['=0.7.x', '0.7.2'],
    ['>=0.7.x', '0.7.2'],
    ['=0.7.x', '0.7.0-asdf'],
    ['>=0.7.x', '0.7.0-asdf'],
    ['<=0.7.x', '0.6.2'],
    ['>0.2.3 >0.2.4 <=0.2.5', '0.2.5'],
    ['>=0.2.3 <=0.2.4', '0.2.4'],
    ['1.0.0 - 2.0.0', '2.0.0'],
    ['^1', '0.0.0-0'],
    ['^3.0.0', '2.0.0'],
    ['^1.0.0 || ~2.0.1', '2.0.0'],
    ['^0.1.0 || ~3.0.1 || 5.0.0', '3.2.0'],
    ['^0.1.0 || ~3.0.1 || 5.0.0', '1.0.0beta', true],
    ['^0.1.0 || ~3.0.1 || 5.0.0', '5.0.0-0', true],
    ['^0.1.0 || ~3.0.1 || >4 <=5.0.0', '3.5.0']
  ].forEach(function(tuple) {
    var range = tuple[0];
    var version = tuple[1];
    var loose = tuple[2] || false;
    var msg = '!gtr(' + version + ', ' + range + ', ' + loose + ')';
    t.notOk(gtr(version, range, loose), msg);
  });
  t.end();
});

test('\noutside should throw if hilo is not set', function (t) {
  t.throws(semver.outside.bind(semver, '1.2.3', '*', 'x'))
  t.end()
})
