import bcrypt from 'bcryptjs';

export function saltAndHashPassword(password) {
    const saltRounds = 10; // the number of rounds to process the data for
    const salt = bcrypt.genSaltSync(saltRounds); // synchronously generate a salt
    const hash = bcrypt.hashSync(password, salt); // synchronously generate a hash of the password
    return hash; // return the hash directly as a string
}