const express = require('express')
const router = express.Router();
const shortIds = require('../../public/js/shortId')
const urlModel = require("../../models/url")

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/result', (req, res) => {
  const originLink = req.body.originalURL;
  // get a shortid
  //short = getShortId();
  let short = shortIds();
  //console.log(short);

  return urlModel.find()
    .then(result => {
      const fullUrls = []
      const shortUrls = []
      result.forEach(each => {
        fullUrls.push(each.fullUrl);
        shortUrls.push(each.shortUrl);
      }) //防止有重覆的網址組合出現
      while (shortUrls.indexOf(short) !== -1) {
        short = shortIds();
      } // 如果已經有被縮短的網址，則不把重新create一筆資料
      if (fullUrls.indexOf(originLink) === -1) {
        urlModel.create({ fullUrl: req.body.originalURL, shortUrl: short }).then(() => {
          res.render("result", { fulllink: originLink, short: short })
        })
      } else {
        urlModel.find({ fullUrl: originLink })
          .lean()
          .then(result => {
            short = result[0].shortUrl;
          }).then(() => {
            //console.log(short)
            res.render("result", { fulllink: originLink, short: short })
          })
      }
    })
    .catch(err => {
      console.log(err)
    })


})

router.get('/:shortString', async (req, res) => {
  const result = await urlModel.findOne({ shortUrl: req.params.shortString })
  if (result === null) {
    return res.sendStatus(404)
  }
  res.redirect(result.fullUrl);
})

module.exports = router;