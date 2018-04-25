import { guid } from 'actions/utils'

export default class point {
    constructor(props) {
        const { id, x, y, yoe, rank, category, description, company, targetId, sourceId, skill, priority } = props;

        this.id = id !== undefined ? id : this.id;
        this.x = x || this.x;
        this.y = y || this.y;
        this.yoe = yoe || this.yoe;
        this.rank = rank || this.rank;
        this.category = category || this.category;
        this.company = company || this.company;
        this.description = description || this.description;
        this.targetId = this.targetId;
        this.sourceId = this.sourceId;
        this.skill = skill || this.skill
        this.priority = priority || this.priority;
    }

    id = guid();
    x = 0;
    y = 0;
    yoe = 0;
    rank = 0;
    category = { title: 'None' };
    company = 0;
    description = 'description...';
    targetId = 0;
    sourceId = 0;
    skill = '';
    priority = { title: 'High' }
}