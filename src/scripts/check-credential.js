"use strict";
function checkCredential(username, password) {
    if (username === 'admin' && password === 'admin') {
        return 'success';
    }
    else {
        return 'invalid username or password';
    }
}
