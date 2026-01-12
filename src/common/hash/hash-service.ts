import * as bcrypt from 'bcrypt';

export class HashServiceHelper {
    static round = 10;
    static async compareHash(dataDto: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(dataDto, hashed);
    }

    static async hashData(data: string): Promise<string> {
        return await bcrypt.hash(data, HashServiceHelper.round);
    }
}