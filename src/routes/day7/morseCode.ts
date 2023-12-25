const morseLetterMapping: Record<string, string> = {
	a: '.-',
	b: '-...',
	c: '-.-.',
	d: '-..',
	e: '.',
	f: '..-.',
	g: '--.',
	h: '....',
	i: '..',
	j: '.---',
	k: '-.-',
	l: '.-..',
	m: '--',
	n: '-.',
	o: '---',
	p: '.--.',
	q: '--.-',
	r: '.-.',
	s: '...',
	t: '-',
	u: '..-',
	v: '...-',
	w: '.--',
	x: '-..-',
	y: '-.--',
	z: '--..',
	'0': '-----',
	'1': '.----',
	'2': '..---',
	'3': '...--',
	'4': '....-',
	'5': '.....',
	'6': '-....',
	'7': '--...',
	'8': '---..',
	'9': '----.',
	'.': '.-.-.-',
	',': '--..--',
	'?': '..--..',
	"'": '.----.',
	'!': '-.-.--',
	'/': '-..-.',
	'(': '-.--.',
	')': '-.--.-',
	'&': '.-...',
	':': '---...',
	';': '-.-.-.',
	'=': '-...-',
	'+': '.-.-.',
	'-': '-....-',
	_: '..--.-',
	'"': '.-..-.',
	$: '...-..-',
	'@': '.--.-.',
	'¿': '..-.-',
	'¡': '--...-',

	//Skip characters
	' ': ' / '
};

export const translateToMorse = (text: string) => {
	if (!text || text.length <= 0) {
		return '';
	}

	const workingText = text.toLowerCase();

	let translation = '';
	for (let i = 0; i < workingText.length; i++) {
		const char = workingText.charAt(i);
		let translatedChar = morseLetterMapping[char];
		if (translatedChar === undefined || translatedChar === null) {
			console.warn('Invalid character detected:', char);
			translatedChar = '';
		}

		translation += translatedChar;
	}
	return translation;
};
