exports.isValidEmail = (mail) => {
  // eslint-disable-next-line no-useless-escape
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
};
exports.isValidName = (name) => {
  if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) return true;
};
exports.isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
exports.isValidPhone = (mobile) => {
  if (/^([9876]{1})(\d{1})(\d{8})$/.test(mobile)) return true;
};

exports.isValidPassword = (pw) => {
  if (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pw)) return true;
};
exports.isValidBody = (body) => {
  if (/^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/.test(body))
    return true;
};
