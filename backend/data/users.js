import bcrypt from 'bcryptjs'

const user = [
    {
        "name": "Sikander Malik",
        "email": "smalik01@gmail.com",
        "password": bcrypt.hashSync("pass123", 10),
        "isAdmin": true
    },
    {
        "name": "Muhammad Saim",
        "email": "saimrap7@gmail.com",
        "password": bcrypt.hashSync("pass123", 10),
        "isAdmin": false
    },
    {
        "name": "smith charles",
        "email": "smith12@gmail.com",
        "password": bcrypt.hashSync("pass123", 10),
        "isAdmin": false
    }
]

export default user;