const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')

router.get('/', (req, res) => {
    res.render('general/home')
})

router.get('/404', (req, res) => {
    res.render('general/404')
})

module.exports = router;