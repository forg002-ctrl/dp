import bcrypt from 'bcrypt';

export class Crypto {
    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    }
}
