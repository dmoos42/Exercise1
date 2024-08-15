const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Exercise1.html'));
});


app.post('/findSummation', (req, res) => {
    let theNumber = req.body.number;
    let sum = findSummation(theNumber);
    res.send(`Sum: ${sum}`);
});

app.post('/uppercaseFirstandLast', (req, res) =>{
    let theString = req.body.string;
    let sentence = uppercaseFirstandLast(theString);
    res.send(`Your sentence with a capitalized first and last letter on every word: ${sentence}`);
});

app.post('/findAverageAndMedian', (req, res) =>{
    let nums = req.body.array;
    nums = nums.split(",").map(Number);
    let answer = findAverageAndMedian(nums);
    res.send(`The average is: ${answer.avg}, The median is: ${answer.median}`);
});

app.post('/find4Digits', (req, res) => {
    let digits = find4Digits(req.body.fdigits);
    res.send(`The first four digits: ${digits}`);
});

function findSummation(N){
    if(N <= 0 || isNaN(N)){
        return false;
    } else {
        let sum = 0;
        for(let i = 0; i <= N; i++){
            sum += i;
        }   
        return sum;
    }
}

function uppercaseFirstandLast(inputString){
    let seperated = inputString.split(" ");
    for(let i = 0; i < seperated.length; i++){
        seperated[i] = seperated[i].substring(0,1).toUpperCase() + seperated[i].substring(1,seperated[i].length-1) + seperated[i].substring(seperated[i].length-1).toUpperCase();
    }
    return seperated.join(" ");
}

function findAverageAndMedian(numbers){
    numbers.sort(function(a,b){return a-b});

    let sumOfArray = 0;
    for(let i = 0; i < numbers.length; i++){
        sumOfArray += numbers[i];
    } 
    let avg = sumOfArray / numbers.length;

    let middle = Math.floor(numbers.length/2);

    let median = 0;
    if(numbers.length % 2 !== 0){
        median = numbers[middle];
    } else {
        median = (numbers[middle - 1] + numbers[middle])/2;
    }

    return {avg, median};    
}

function find4Digits(numsStr){
    let numbers = numsStr.split(' ');
    let fourDigit = false;

    for(let i = 0; i < numbers.length; i++){
        if(/^\d{4}$/.test(numbers[i])){
            return parseInt(numbers[i]);
        }
    }
    return fourDigit;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});