function checkCredential(username: string, password: string) : string | 'success' {
  if (username === 'admin' && password === 'admin') {
    return 'success';
  } else {
    return 'invalid username or password';
  }
}
