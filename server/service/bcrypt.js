import bcrypt from 'bcrypt';

export async function hashPassword(password){
    const hash = bcrypt.hashSync(password, 10);
    return hash
}

export async function checkPassword(password, hash){
    const compare = bcrypt.compareSync(password, hash);
    return compare
}