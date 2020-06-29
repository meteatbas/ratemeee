module.exports = {
    auth: {
        user: 'meteatbas@gmail.com',
        pass: 'Sananelo10.'
    },
    
    facebook: {
        clientID: '1861759354108916', //Facebook login app id
        clientSecret: 'c88516cf29c19d5d591189d013a7c254', //Facebook login secret key
        profileFields: ['email', 'displayName'],
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
    }
}