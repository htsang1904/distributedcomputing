module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/driver/new-request',
            handler: 'driver.driverRegister',
        },
        {
            method: 'GET',
            path: '/driver/get-drivers',
            handler: 'driver.getData',
        },
        {
            method: 'POST',
            path: '/driver/update',
            handler: 'driver.approveDriver',
        }
    ]
}
