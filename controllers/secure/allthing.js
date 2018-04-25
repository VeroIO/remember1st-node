var express = require("express");
var router = express.Router();
var mSecurePlace = require("../../models/securePlace");
var mCategories = require("../../models/categories");
const paginate = require("express-paginate");

router.use(paginate.middleware(10, 50));

router.route("").get(isLoggedIn, function (req, res) {
    mSecurePlace.findAndCountAll({ limit: parseInt(req.query.limit), offset: req.skip }).then(function (results) {
        var cookies = parseCookies(req);
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / parseInt(req.query.limit));
        if (req.query.page == null) {
            req.query.page = 0;
        }
        mCategories.findAll({ where: { type: 'notes' } }).then(function (allNotes) {
            res.render('secure/allthing', {
                user: req.user,
                token: cookies.jwt,
                allrows: results.rows,
                allnotes: allNotes,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, parseInt(req.query.page)),
            });
        });
    });
});

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;