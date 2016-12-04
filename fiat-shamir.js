const math = require('mathjs');

const MIN_PRIME = process.env.MIN_PRIME || 2;
const MAX_PRIME = process.env.MAX_PRIME || 10000;

const LOAD_CHARS = ['|', '/', '-', '\\'];
const PRIMES = [];

math.config({
    number: 'BigNumber'
});

function loadPrimes() {
    let c = 0;
    for(let i = MIN_PRIME; i < MAX_PRIME; i++) {
        if (math.isPrime(i)) {
            PRIMES.push(i);
        }
        c++;
        
        if (c === 4) c = 0;
        process.stdout.write(`loading primes ... ${LOAD_CHARS[c]}\r`);
    }
    process.stdout.write(`loading primes ... done\n`);
}

function getCooprime(n) {
    let cooprime;

    do {
        cooprime = math.randomInt(1, n);
    } while(math.gcd(n, cooprime) !== 1);
    
    return cooprime;
}

function main() {
    loadPrimes();

    const p = math.pickRandom(PRIMES);
    let q;
    do {
        q = math.pickRandom(PRIMES);
    } while(q === p);
    const n = math.multiply(p, q);
    const s = getCooprime(n);
    const v = math.mod(math.square(s), n);
    const r = math.randomInt(1, n);
    const x = math.mod(math.square(r), n);
    const e = math.pickRandom([0, 1]);
    const y = math.mod(math.multiply(r, math.pow(s, e)), n);
    console.log(math.mod(math.square(y), n));
    console.log(math.mod(math.multiply(x, math.pow(v, e)), n));
}

main();
