function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePW(password) {
    const re = /^[0-9a-zA-Z].{5,50}$/
    return re.test(String(password));
}

function validatePhone(phone) {
    return phone.length < 14
}

function validateName(username) {
    const re = /^[가-힣a-zA-Z]*$/
    return re.test(String(username))
}

function validatePostcode(code) {
  const re = /^[0-9]+$/
  return re.test(code)
}

export { validateEmail, validatePW, validatePhone, validateName, validatePostcode }