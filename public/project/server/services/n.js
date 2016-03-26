function generateIpsum() {
    //return words;
    //to create a random number picker that picks a random indexed word from words
    var arr = words.split(" ");//parse words to array
    var len = arr.length;//number of variables 
    var targetLen = 1000;
    var charCount = 0;
    var result = "";
    while (charCount <= targetLen){
        var tmp = arr[Math.floor(Math.random()*len - 1)];
        result += " "+ tmp;
        charCount += tmp.length;
    }
    return result;
}
document.getElementById('fill').innerHTML = generateIpsum();
