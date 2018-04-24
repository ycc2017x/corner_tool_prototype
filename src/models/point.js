import { guid } from 'actions/utils'

export default class point {
    constructor(props) {
        const { id, x, y, time, rank, category, description, company, targetId, sourceId } = props;

        this.id = id !== undefined ? id : this.id;
        this.x = x || this.x;
        this.y = y || this.y;
        this.time = time || this.time;
        this.rank = rank || this.rank;
        this.category = category || this.category;
        this.company = company || this.company;
        this.description = description || this.description;
        this.targetId = this.targetId;
        this.sourceId = this.sourceId;
    }

    id = guid();
    x = 0;
    y = 0;
    time = 0;
    rank = 0;
    category = 0;
    company = 0;
    description = 'description...';
    targetId = 0;
    sourceId = 0;
}