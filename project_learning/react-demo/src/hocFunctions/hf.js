function login(username) { 
    console.log(username + ' log in!')

}

function logout(username) { 
    console.log(username + ' log out!')

}

function propUsername(callback) { 
    function getUsername() {
        let username = 'casey'
        callback(username)
    }
    return getUsername
}

let newLogin = propUsername(login)
let newLogout = propUsername(logout)

newLogin()
newLogout()