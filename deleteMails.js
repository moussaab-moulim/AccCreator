const { XMLHttpRequest } = require('xmlhttprequest');
const key = 'k_8cm5OIGrNWo2TmbZpktWQPNKB6px7LxumkfzDrrdjLk'; // clé API mail
const getMailListUrl = 'https://mailsac.com/api/addresses/'; //appel API mail
const releaseEmail = (email) =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();

    http.onload = () => {
        let mail = JSON.parse(http.responseText);
        console.log(mail);
      return resolve();
    };
    http.open('DELETE', getMailListUrl + email + '?_mailsacKey=' + key+'&deleteAddressMessages=false', true);
    http.responseType = 'json';
    http.send();
  });
const getAllMails = () =>
  new Promise(async (resolve, reject) => {
    let http = new XMLHttpRequest();
    let mailList = [];

    http.onload = () => {
      let mails = JSON.parse(http.responseText);

      mails.forEach((mail) => {
          //console.log("mail",mail._id);
        releaseEmail(mail._id);
      });

      return resolve(mailList);
    };
    http.open('GET', getMailListUrl + '?_mailsacKey=' + key, true);
    http.responseType = 'json';
    http.send();
  });

  getAllMails();