import test from 'ava';

import wordCount from '../src/word-count';

test('word count works', t => {
	const result = wordCount('Hello, world');
	t.same(result, {hello: 1, world: 1});
	t.is(Object.keys(result).length, 2);
});

test('Count of the same word is correct', t => {
	const str = Array(20).fill('Hello').join(' ');
	const result = wordCount(str);

	t.ok(result.hasOwnProperty('hello'));
	t.is(result.hello, 20);
});

test('Count of multiple words is correct', t => {
	const helloArr = Array(10).fill('Hello');
	const worldArr = Array(9).fill('world');
	const commaArr = Array(8).fill(',');
	const numArr = Array(7).fill('3');
	const input = [...helloArr, ...worldArr, ...commaArr, ...numArr].join(' ');
	const result = wordCount(input);

	t.is(result.hello, 10);
	t.is(result.world, 9);
	t.is(result[','], undefined);
	t.is(result['3'], undefined);
});

test('Non-string input is handled ok', t => {
	const inputArr = ['hi'];
	const inputNum = 3;
	const inputBool = true;

	t.throws(() => wordCount(inputArr));
	t.throws(() => wordCount(inputNum));
	t.throws(() => wordCount(inputBool));
});

test('word count challenge', t => {
	const sampleText = `
		Beware the Jabberwock, my son!
		The jaws that bite, the claws that catch!
	`;

	const expectedResult = {
		the: 3,
		that: 2,
		beware: 1,
		bite: 1,
		catch: 1,
		claws: 1,
		jabberwock: 1,
		jaws: 1,
		my: 1,
		son: 1
	};

	const result = wordCount(sampleText);
	t.same(result, expectedResult);
	t.same(Object.keys(result), Object.keys(expectedResult));
});

test('word count edge cases', t => {
	const emptyStr = '';
	const emptyStrResult = wordCount(emptyStr);
	t.is(emptyStrResult, undefined);

	const spaceCharsStr = '    ';
	const spaceCharsStrResult = wordCount(spaceCharsStr);
	t.is(spaceCharsStrResult, undefined);

	const singleCharStr = 'a';
	const singleCharStrResult = wordCount(singleCharStr);
	t.same(singleCharStrResult, {a: 1});

	const symbolsStr = '! @ £ $ \/\/ ';
	const symbolsStrResult = wordCount(symbolsStr);
	t.is(symbolsStrResult, undefined);
});

