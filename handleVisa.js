//#region Global Variables
const readln = process.stdout;
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const open = promisify(fs.open);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const path = require('path');
const { XMLHttpRequest } = require('xmlhttprequest');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];
const isPkg = typeof process.pkg !== 'undefined';

let chromiumPath = isPkg
  ? puppeteer
      .executablePath()
      .replace(
        process.platform != 'win32'
          ? /^.*?\/node_modules\/puppeteer\/\.local-chromium/
          : /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      )
  : puppeteer.executablePath();

const siteData = {
  appName: 'wizara',
  app: 'http://www.essonne.gouv.fr/booking/create/23014/0',
  appHome: 'http://www.essonne.gouv.fr/',

  condition_booking: '#condition_Booking',
  submit_booking: '#submit_Booking',
  demande_id: '#planning23199',
  formbookingcreate: '#FormBookingCreate',
  newletterCheck:
    'body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div:nth-child(1) > div > div > div > div.ak-inner-block > div > div.col-md-8 > div > form > fieldset > div > div > div > div:nth-child(8) > div > div > label',
  submit: '#submit_field',
  siteKey: '6LfbFRsUAAAAACrqF5w4oOiGVxOsjSUjIHHvglJx',
};

const defaultData = {
  inputFileName: 'proxy.txt',
  outputFileName: 'accounts.txt',
  dirs: {
    captureDir: 'capture',
    logDir: 'log',
    outDir: 'out',
  },
  proxyAllowedCountries: [
    'BD',
    'BE',
    'BJ',
    'MM',
    'BO',
    'CM',
    'CA',
    'CY',
    'FR',
    'GB',
    'IQ',
    'JP',
    'PG',
    'PY',
    'PR',
    'PE',
    'SV',
    'SD',
    'PS',
    'LK',
    'UA',
  ],
};

const stdClrs = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

const ipValidityUrl = 'https://hidemyna.me/api/geoip.php?out=js&htmlentities';
const antiCaptchaKey = 'e30eeaf2332e75a473b6f4df2a75a1be'; //Anti-captcha key
const createTaskUrl = 'https://api.anti-captcha.com/createTask';
const getTaskResultUrl = 'https://api.anti-captcha.com/getTaskResult';
const mailDomain = '@moulimmoussaab.ml'; //remplacez par votre domaine mail
const key = 'ANcSTbTEJ2iAC1KFFUxYpFXphu8V51Byxj71eu6vh7Q'; // clé API mail
const getMailListUrl = 'https://mailsac.com/api/addresses/'; //appel API mail

// Filtering and detecting arguments
const arguments = process.argv;
let skipNext = false;
let inputFile,
  outputFile,
  useProxy = true,
  useEmulation = false;

arguments.forEach((arg, key) => {
  if (key < 1 || skipNext) {
    skipNext = false;
    return;
  }
  if (arg[0] === '-') {
    skipNext = true;
    switch (arg[1]) {
      case 'i':
        inputFile = arguments[key + 1];
        break;

      case 'o':
        outputFile = arguments[key + 1];
        break;

      case '-':
        switch (arg.substring(2)) {
          case 'use-proxy':
            useProxy = true;
            break;

          case 'no-proxy':
            useProxy = false;
            break;

          case 'use-emulation':
            useEmulation = true;
            break;

          case 'no-emulation':
            useEmulation = false;
            break;

          default:
            break;
        }
        break;

      default:
        skipNext = false;
        console.error('Unknown argument Encountered');
        break;
    }
  }
});

if (!inputFile) {
  inputFile = defaultData.inputFileName;
}
if (!outputFile) {
  outputFile = defaultData.dirs.outDir + '/' + defaultData.outputFileName;
}

//#endregion

//#region Helper Functions

const delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });

const tempId = () => {
  const getRandomString = () => Math.random().toString(36).substr(2, 9);
  let isNumber = (temp, key) => !isNaN(temp.charAt(key));

  let tempStr = getRandomString();
  let firstChar = isNumber(tempStr, 0);
  let numCount = 0;
  while (firstChar || numCount == 0) {
    numCount = 0;
    tempStr = getRandomString();
    firstChar = isNumber(tempStr, 0);
    for (let i = 0; i < tempStr.length; i++) {
      if (isNumber(tempStr, i)) {
        numCount++;
      }
    }
  }

  let firstLtr = tempStr.charAt(0);
  return tempStr.replace(firstLtr, firstLtr.toUpperCase());
};

const getRnd = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getFrenchMonth = function (month) {
  const months = {
    '1': 'Janvier',
    '2': 'Fevrier',
    '3': 'Mars',
    '4': 'Avril',
    '5': 'Mai',
    '6': 'Juin',
    '7': 'Juillet',
    '8': 'Aout',
    '9': 'Septembre',
    '10': 'Octobre',
    '11': 'Novembre',
    '12': 'Decembre',
  };

  return months[`${month}`];
};

var _loadTick = 0;
var _msg = '';
const waiting = (msg, t) => {
  _msg = msg;
  return setInterval(() => {
    readln.clearLine();
    readln.cursorTo(0);
    _loadTick = (_loadTick + 1) % 4;

    var dots = new Array(_loadTick + 1).join('.');
    readln.write(msg + dots);
  }, t);
};

const stopWaiting = (timer, status) => {
  clearInterval(timer);
  loadTick = 0;
  readln.clearLine();
  readln.cursorTo(0);
  readln.write(_msg + '... ' + status + stdClrs.Reset + '\n');
};

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const getTwoDigitString = (no) => ('0' + no.toString()).slice(-2);

var getDateTime = () => {
  let date = new Date();
  return (
    '[' +
    getTwoDigitString(date.getDate()) +
    '-' +
    getTwoDigitString(date.getMonth()) +
    '-' +
    getTwoDigitString(date.getFullYear()) +
    ' ' +
    getTwoDigitString(date.getHours()) +
    ':' +
    getTwoDigitString(date.getMinutes()) +
    ':' +
    getTwoDigitString(date.getSeconds()) +
    ']'
  );
};

//#endregion

//#region Utility Functions
//#region   File Control Functions

const checkDir = async (dir, callback) =>
  new Promise(async (resolve, reject) => {
    await stat(dir, function (err, stats) {
      if (!err) return;
      if (err && err.errno === -4058) {
        mkdir(dir);
      } else {
        callback(err);
      }
    });
  });

const readInputFile = (fileName) =>
  new Promise(async (resolve, reject) => {
    console.log('\x1b[36m%s\x1b[0m', 'Createur de compte - Syliaz#1452');
    console.log(
      '\x1b[36m%s\x1b[0m',
      'Discord : https://discordapp.com/invite/FqwpVQW'
    );

    try {
      readFile(fileName, 'utf-8', (err, content) => {
        if (err) {
          return reject(err);
        }

        var proxyList = [];
        content.split('\n').forEach((line, key) => {
          let proxy = line.trim().split(':');

          if (proxy == '' || proxy[2].split('.').length < 4) {
            // console.error('Invalid type of IP address Detected: ', proxy);
            return;
          }

          let tempObj = {};
          tempObj['_id'] = key;
          tempObj['username'] = proxy[0];
          tempObj['password'] = proxy[1];
          tempObj['ip'] = proxy[2];
          tempObj['port'] = proxy[3];

          proxyList.push(tempObj);
        });

        if (proxyList.length == 0) {
          console.log(
            'No Proxy IPs found in the given file.\nTerminating application...'
          );
          return reject({ errorId: 1, msg: 'No IP found' });
        }

        console.log(`${proxyList.length} proxy IPs found`);
        return resolve(proxyList);
      });
    } catch (err) {
      console.log(`Error occured when reading \'${fileName}\'': `, err);
      return reject({ errorId: -1, error: err });
    }
  });

const writeOutputFile = (fileName, data) =>
  new Promise(async (resolve, reject) => {
    open(fileName, 'a', (err, fd) => {
      if (err) throw err;
      fs.appendFile(fd, data, 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        if (err) throw err;
        resolve({ status: 'success' });
      });
    });
  });

const LOG = async (log) => {
  await writeOutputFile('log/LOG.txt', `${getDateTime()} ${log}\n`);
};

//#endregion
//#region   Browser Control functions

// Initialize browser window for proxy details
const initBrowser = (proxy) =>
  new Promise(async (resolve, reject) => {
    try {
      let browser = await puppeteer.launch({
        executablePath: chromiumPath,
        // headless: false,
        // slowMo: 100,
        args: [],
      });

      resolve(browser);
    } catch (error) {
      console.log('Error in initBrowser: ', error);
      // reject(error);
    }
  });

// Close pre-opened browser window
const closeBrowser = (browser) =>
  new Promise(async (resolve, reject) => {
    try {
      await browser.close();
      return resolve({ status: 'success' });
    } catch (error) {
      console.log('Error in closeBrowser: ', error);
      reject(error);
    }
  });

//#endregion
//#region   Network Requests

const creatAntiCaptchaTask = () =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = function (e) {
      if (http.readyState === 4) {
        let taskData = JSON.parse(http.responseText);
        if (taskData.errorId !== 0) reject(taskData);
        resolve(taskData);
      } else console.log("Error in response Data 'anti-captcha task creation'");
    };

    try {
      http.open('POST', createTaskUrl, true);
      http.responseType = 'json';
      http.send(
        JSON.stringify({
          clientKey: `${antiCaptchaKey}`,
          task: {
            type: 'NoCaptchaTaskProxyless',
            websiteURL: 'https://www.dofus.com/fr/mmorpg/jouer',
            websiteKey: `${siteData.siteKey}`,
          },
          softId: 0,
          languagePool: 'en',
        })
      );
    } catch (err) {
      console.log('Error in anti-captcha request', err);
      reject(err);
    }
  });

const getAntiCaptchaResponseKey = (taskId) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = async function (e) {
      let response = JSON.parse(http.responseText);

      if (response.status === 'processing') {
        setTimeout(() => {
          return resolve(getAntiCaptchaResponseKey(taskId));
        }, 2000);
      } else {
        if (response.errorId !== 0) return reject(response);
        return resolve(response);
      }
    };

    try {
      http.open('POST', getTaskResultUrl, true);
      http.responseType = 'json';
      http.send(
        JSON.stringify({
          clientKey: `${antiCaptchaKey}`,
          taskId: `${taskId}`,
        })
      );
    } catch (error) {
      console.log('Error in anti-captcha responseKey request', error);
      return reject(error);
    }
  });

const handleFormSubmission = async (dataIn) => {
  let browser, status;

  await LOG('Initializing Browser');
  console.log('Visa reservation started');
  browser = await initBrowser();

  await LOG('Account Creation Started');

  let noOfPages = dataIn.cycles;
  for (let page = 0; page < noOfPages; page++) {
    await LOG(`Starting ${page + 1} of ${dataIn.cycles} form submission`);
    let webPage = await browser.newPage();

    if (useEmulation) await webPage.emulate(iPhonex);

    let msgStart = stdClrs.FgYellow + `[${page + 1}] ` + stdClrs.Reset;

    //#region Loading Signup Page

    let pageLoading = waiting(msgStart + 'Page Loading', 800);
    try {
      await webPage.goto(siteData.app, { waitUntil: 'load' });
    } catch (err) {
      if (noOfPages < 2) noOfPages++;
      stopWaiting(pageLoading, stdClrs.FgRed + 'ERROR');
      await LOG(`Error occured while loading: ${siteData.app} ${err}`);
      await webPage.close();

      continue;
    }
    await LOG(`${siteData.app} URL loaded`);
    stopWaiting(pageLoading, stdClrs.FgGreen + 'DONE');

    //#endregion

    //#region Form Submission
    await LOG('Starting Form auto filling');
    console.log('started filling');

    try {
      await Promise.all([
        await webPage.evaluate(() => {
          document.querySelector(condition_booking).click();
        }),
        await webPage.evaluate(() => {
          document.querySelector(submit_booking + '>input:first-child').click();
        }),
      ]);
      console.log('Form filling finished');
    } catch (error) {
      await LOG(`Error on form fill: ${error}`);

      await webPage.close();

      status = {
        errorId: 10,
        msg: 'Error on form filling',
        error: error,
      };

      break;
    }

    await webPage.screenshot({
      path: `./capture/${Date.now()}_${formData.username}_${
        formData.password
      }_beforeSubmission.png`,
      fullPage: true,
    });
    await LOG('Submitting filled signup form');
    //await webPage.click(siteData.submit);
    await webPage.waitFor(10 * 1000);

    stopWaiting(formFilling, stdClrs.FgGreen + 'DONE');

    //#endregion

    await webPage.close();
  }
  await closeBrowser(browser);

  if (status) {
    return status;
  }
  return { errorId: 0, msg: 'successfull' };
};

const handleTasks = async () => {
  console.clear();

  let status = await handleFormSubmission({
    cycles: 3,
    entryNo: 1,
  });

  return;
};

//#endregion

(async function () {
  console.log('hnaaa');
  await handleTasks();

  process.exit();
})();
