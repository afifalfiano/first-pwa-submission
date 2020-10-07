const quotesData = [
    "Hello World",
    "Hello",
    "Helloooo"
  ];
  
  function generateQuotes () {
    var randomNumber = Math.floor(Math.random() * (quotesData.length));
    document.getElementById('quotes').innerHTML = quotesData[randomNumber];
  }
  