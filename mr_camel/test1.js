/* [Assignment 5] 미스터카멜 #1
* 주어진 문자의 자음별 개수를 구해주세요.
* input: "사과1호랑이,고니 수박BT닭"
* output:
ㄱ:2, ㄴ:1, ㄷ:1, ㄹ:1, ㅁ:0, ㅂ:1, ㅅ:2, ㅇ:1, ㅈ:0, ㅊ:0, ㅋ:0, ㅌ:0, ㅍ:0, ㅎ:1 */

const readLine = require('readline');
const { BASE, CONSONANT_INTERVAL, consonant } = require('./consonant');
const { answerList } = require('./answerList');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getKoreanWithoutVowels = line =>
  line.split('').filter(ele => ele.match(/[ㄱ-ㅎ|가-힣]/));

const separateWord = cur => {
  const charCodeOfCur = cur.charCodeAt(0);
  const curMinusBase = charCodeOfCur - BASE;
  return charCodeOfCur >= 12593 && charCodeOfCur <= 12622
    ? cur
    : consonant[Math.floor(curMinusBase / CONSONANT_INTERVAL)];
};

const solution = line => {
  const consonantList = getKoreanWithoutVowels(line).map(ele =>
    separateWord(ele),
  );
  let answer = consonantList.reduce((acc, cur) => {
    acc[cur] = acc[cur] + 1;
    return acc;
  }, answerList);
  Object.entries(answer).forEach(([key, value]) =>
    console.log(`${key}: ${value}`),
  );
};

rl.on('line', function (line) {
  solution(line);
  rl.close();
}).on('close', function () {
  process.exit();
});
