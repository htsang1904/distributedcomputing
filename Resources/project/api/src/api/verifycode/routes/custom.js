module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/verifycode/new-request',
            handler: 'verifycode.mailVerification'
        }
    ]
}