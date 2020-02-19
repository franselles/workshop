module.exports = {
  port: process.env.PORT || 8080,
  db:
    process.env.MONGODB_URI ||
    'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious'
};

// 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious'
// process.env.MONGODB_URI
// 'mongodb://localhost/userserious'
