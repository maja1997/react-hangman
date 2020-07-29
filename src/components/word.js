const programski_jezici = [
    'python',
    'javascript',
    'mongodb',
    'json',
    'java',
    'html',
    'css',
    'csharp',
    'golang',
    'kotlin',
    'php',
    'sql',
    'ruby'
];

//randomRec() vraca neku od ovih reci iz niza programski_jezici
const randomRec = () => programski_jezici[Math.floor(Math.random() * programski_jezici.length)];

export default randomRec;