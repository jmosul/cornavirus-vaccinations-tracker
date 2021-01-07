import Model from '@/models/Model';

export default class Collection {
    protected items: Model[] = [];

    get count(): number {
        return this.items.length;
    }
}
