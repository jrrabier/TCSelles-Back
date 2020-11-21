const PSWREGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const MAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

module.exports.isPasswordValid = (password) => {
    return PSWREGEX.test(password);
}

module.exports.isMailValid = (mail) => {
    return MAILREGEX.test(mail);
}