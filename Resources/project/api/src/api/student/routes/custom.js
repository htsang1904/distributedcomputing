module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/student/new-request',
            handler: 'student.studentRegister'
        },
        {
            method: 'POST',
            path: '/student/verification',
            handler: 'student.verifyEmailCode'
        }
    ]
}