var express = require("express");
var router = express.Router();
var mCategories = require("../../models/categories");
const paginate = require("express-paginate");

router.use(paginate.middleware(10, 50));

router.route("").get(isLoggedIn,function(req, res) {
    mCategories.findAndCountAll({limit: parseInt(req.query.limit),offset: req.skip}).then(function(results) {
        var cookies = parseCookies(req);
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / parseInt(req.query.limit));
        if (req.query.page == null) {
            req.query.page=0;
        }
        res.render('admin/notesmanagement', {
            user : req.user,    
            token: cookies.jwt,
            categories: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, parseInt(req.query.page)),
        });
    });
});
router.route("").post(isLoggedIn,function(req, res) {
    type=req.body.type;
    if(type=="xoacate"){
        mCategories.destroy({ where: { id: req.body.id } }).then(function(results) {
            if(results==1){
                res.send(("Đã Thành Xóa Thành Công ID:" + req.body.id));
            }else{
                res.send("Thao Tác Không Thành Công");
            }
        });
    }else if(type=="addcate"){
        var newCategory = {
          type: req.body.cate_type,
          name: req.body.cate_name
        };
        mCategories.create(newCategory).then(function(task) {
            res.send("Đã Thêm Thành Công : " + req.body.cate_name+"Vào Categories");
        }).catch(function (err) {
            res.send("Thao Tác Không Thành Công");
        })
    }else if(type=="editcate"){

    }else{
        res.send("Error")
    }
});
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
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