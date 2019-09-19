class CoinWrapper {

  constructor() {
    this.store = {}
  }
  
  changePossibilities(amountLeft, denominations, currentCoinIndex = 0) {
    // Calculate the number of ways to make change
    // denominations --- The types of coins allowed in this test
    
    const storageKey = [amountLeft, currentCoinIndex].join(', ')
    if (this.store.hasOwnProperty(storageKey)) {
      // console.log('grabbing from "store" [' + storageKey + ']...  ')
      return this.store[storageKey]; // 0, aka. a cached Success!
    }

  
    if (amountLeft === 0) return 1; // Success
  
    if (amountLeft < 0 ) return 0;  // Overshot
  
    if (currentCoinIndex === denominations.length) return 0;  // No more coin types to try


  
    const currentCoin = denominations[currentCoinIndex]
  
    // See how many possibilities we can get for type of coin
    let numPossibilities = 0;
    while ( amountLeft >= 0 ) {

      numPossibilities += this.changePossibilities(amountLeft, denominations, currentCoinIndex + 1);
      amountLeft -= currentCoin;

    }

    this.store[storageKey] = numPossibilities;
    return numPossibilities;
  }

}


// Tests

let desc = 'sample input';
let coinWrapper = new CoinWrapper();
let actual = coinWrapper.changePossibilities(4, [1, 2, 3]);
let expected = 4;  // WAYS TO SOLVE, USING COINS 1, 2, & 3 cent pieces
assertEqual(actual, expected, desc);

desc = 'one way to make zero cents';
coinWrapper = new CoinWrapper();
actual = coinWrapper.changePossibilities(0, [1, 2]);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'no ways if no coins';
coinWrapper = new CoinWrapper();
actual = coinWrapper.changePossibilities(1, []);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'big coin value';
coinWrapper = new CoinWrapper();
actual = coinWrapper.changePossibilities(5, [25, 50]);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'big target amount';
coinWrapper = new CoinWrapper();
actual = coinWrapper.changePossibilities(50, [5, 10]);
expected = 6;
assertEqual(actual, expected, desc);

desc = 'change for one dollar';
coinWrapper = new CoinWrapper();
actual = coinWrapper.changePossibilities(100, [1, 5, 10, 25, 50]);
expected = 292;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  let el = document.getElementById("output");
  if (a === b) {
    console.log(`${desc} ... PASS`);
    el.innerHTML = el.innerHTML + '<br><br>' + desc + ' ... <span style="color:green"> PASS </span>';
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
    el.innerHTML = el.innerHTML + '<br><br>' + desc + ' ... <span style="color:#ff0033"> FAIL </span>';
  }
}



