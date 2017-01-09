(function() {
  let upload = {};
  let multer = require('multer');

  let hotfixDistStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './my-uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  upload.hotfix = multer({
    storage: hotfixDistStorage,
  });

  module.exports = upload;
})();