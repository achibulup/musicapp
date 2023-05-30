/// <reference path="utils.d.ts" />
/// <reference path="check-credential.ts" />
// check for credentials, if successful, redirect to main page
// else, display error message
function login() {
  const username = nonNull(document.getElementById('username') as HTMLInputElement).value;
  const password = nonNull(document.getElementById('password') as HTMLInputElement).value;
  const checkResult = checkCredential(username, password);
  if (checkResult === 'success') {
    redirectToMainPage();
  } else {
    showErrorMessage(checkResult);
  }
}

function redirectToMainPage() {
  console.log('toMainPage');
  window.location.href = '../pages/main.html';
}

function showErrorMessage(message: string) {
  // alert('what');
  const errorMessageBoxElement = nonNull(document.getElementById('error-message-box'));
  const errorMessageElement = nonNull(document.getElementById('error-message'));
  errorMessageBoxElement.classList.remove('invisible');
  errorMessageElement.innerText = message;
}
