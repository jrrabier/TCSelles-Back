const PSWREGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

module.exports.isPasswordValid = (password) => {
    return PSWREGEX.test(password);
}