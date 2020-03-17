import * as mocks from '../mocks';

export class GetData {
    static async Events() {
        return mocks.events;
    }
    static async Matches() {
        return mocks.matches;
    }
}