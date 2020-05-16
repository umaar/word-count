'use strict';

function reduceToWordScores(a, b) {
	if (a.hasOwnProperty(b)) {
		a[b]++;
	} else {
		a[b] = 1;
	}

	return a;
}

function lowerCaseStr(str) {
	return str.toLowerCase();
}

function sortWordScores(wordCounts) {
	return (a, b) => {
		const str1 = wordCounts[a];
		const str2 = wordCounts[b];
		let result;

		if (str1 < str2) {
			result = -1;
		}

		if (str1 > str2) {
			result = 1;
		}

		if (str1 === str2) {
			// Scores are the same, fallback to alphabetical ordering
			if (a.localeCompare(b) < 0) {
				result = 1;
			} else {
				result = 0;
			}
		}

		return result;
	};
}

function wordCount(sentence) {
	const inputType = typeof sentence;

	if (inputType !== 'string') {
		throw new Error(`
			Error: String not received.
			Instead an input of type: '${inputType}' was received
		`);
	}

	const words = sentence.match(/[a-z]+/gi);

	if (!words || !words.length) {
		return;
	}

	const wordCounts = words
		.map(lowerCaseStr)
		.reduce(reduceToWordScores, {});

	const sortedWordCounts = Object.keys(wordCounts)
		.sort(sortWordScores(wordCounts))
		.reverse()
		.reduce((prev, cur) => {
			prev[cur] = wordCounts[cur];
			return prev;
		}, {});

	return sortedWordCounts;
}

module.exports = wordCount;
