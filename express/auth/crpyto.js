const hash = require('pbkdf2-password');
const hasher = hash();

const pass = 'password';

hasher({pass}, function (err, pass, salt, hash) {
  if(err) {
    console.log(err);
    return;
  }

  console.log('cryptonized password');
  console.log('====================');
  console.log(hash);
  console.log('====================');
  console.log(salt);
  console.log('====================');

  hasher({password: 'password2', salt}, function(err2, pass2, salt2, hash2) {
    if(err2) {
      console.log(err2);
      return;
    }

    console.log('cryptonized password2');
    console.log('====================');
    console.log(hash2);
    console.log('====================');

    if(hash === hash2) {
      console.log('success');
    } else {
      console.log('fail');
    }
  });
});