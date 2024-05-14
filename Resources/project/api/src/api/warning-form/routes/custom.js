module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/warning-form/new-request',
            handler: 'warning-form.submitForm',
        }
    ]
}
