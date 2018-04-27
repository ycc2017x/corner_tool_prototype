import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import { matchStateToTerm } from 'actions/utils'

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addItem: props.addItem,
            selectedCategory: null,
            categories: [
                { value: "I_D", title: "Instructional Design" },
                { value: "S_D", title: "Software Development" },
                { value: "P_M", title: "Project Management" },
                { value: "G_D", title: "Graphic Design" },
                { value: "B_D", title: "Business Development" },
                { value: "Q_A", title: "Quality Assurance" },
                { value: "E_A", title: "Enabling Area" },
                { value: "L_D", title: "Leadership & Development" },
                { value: "D_S", title: "Data Science" },
                { value: "skill", title: "Other" },
            ],
            selectedPriority: 0,
            priorities: [
                { value: "High", title: "High" },
                { value: "Medium", title: "Medium" },
                { value: "Low", title: "Low" },
            ],
            description: '',
            skill: '',
            skillsAuto: [
                { label: "Finding new leads" },
                { label: "Speaking at events" },
                { label: "Attending conferences/conventions" },
                { label: "Developing current leads" },
                { label: "Presenting Regis Capabilities" },
                { label: "PowerPoint presentation" },
                { label: "Writing proposals" },
                { label: "Responding to RFPs" },
                { label: "Facilitating meetings" },
                { label: "Facilitating sessions" },
                { label: "Business development support" },
                { label: "Storyboarding simulations" },
                { label: "HTML/CSS" },
                { label: "Data visualization" },
                { label: "Storyboarding videos" },
                { label: "Motion graphic build" },
                { label: "Brand/Logo design" },
                { label: "Printed material design" },
                { label: "User interface design" },
                { label: "Photoshop" },
                { label: "Illustrator" },
                { label: "InDesign" },
                { label: "Creative Writing" },
                { label: "Camtasia" },
                { label: "Project managing" },
                { label: "Storyboarding" },
                { label: "Technical Writing" },
                { label: "Innovating" },
                { label: "Facilitating" },
                { label: "Researching" },
                { label: "Wireframing" },
                { label: "Captivate" },
                { label: "Lectora" },
                { label: "Mentoring others" },
                { label: "Managing employees" },
                { label: "Managing teams" },
                { label: "Coaching" },
                { label: "Financial analysis" },
                { label: "Budget creation" },
                { label: "Writing user stories" },
                { label: "Evaluating stories" },
                { label: "Reviewing/editing" },
                { label: "Client communication (written)" },
                { label: "Client communication (verbal)" },
                { label: "Admin/logistics" },
                { label: "Problem solving" },
                { label: "Editorial QA" },
                { label: "Data QA" },
                { label: "Technical QA" },
                { label: "Process QA" },
                { label: "Functional QA" },
                { label: "User Testing" },
                { label: "Acceptance Criteria Reivew" },
                { label: "Technical analysis" },
                { label: "Process analysis" },
                { label: "Financial QA" },
                { label: "Java" },
                { label: "Javascript" },
                { label: "HTML" },
                { label: ".NET" },
                { label: "C#" },
                { label: "SQL" },
                { label: "C++" },
                { label: "React" },
                { label: "JIRA Administration" },
                { label: "Accounts Payable" },
                { label: "Accounts Receivable" },
                { label: "Account Reconcilitation" },
                { label: "Project Setup" },
                { label: "Project Close-out" },
                { label: "Interviewing" },
                { label: "scoring models" },
                { label: "Creating Facilitator Materials" },
                { label: "writing assessment questions" },
                { label: "working with SMEs" },
                { label: "Tableau" },
                { label: "Alteryx" },
                { label: "Server Knowledge" },
            ],
            yoe: 1
        }

        if(this.state.addItem.rank !== undefined) { //is edit so fill out items
            const state = this.state;
            const item = state.addItem;

            //find category
            for(var i = 0; i < state.categories.length; i++) {
                let c = state.categories[i];
                if(c.value === item.category.value) {
                    state.selectedCategory = i;
                    break;
                }
            }

            //find priority
            for(var i = 0; i < state.priorities.length; i++) {
                let p = state.priorities[i];
                if(p.value === item.priority.value) {
                    state.selectedPriority = i;
                    break;
                }
            }

            state.skill = item.skill;
            state.description = item.description;
            state.yoe = item.yoe;
        }
    }
    selectCat(e) {
        this.setState({ selectedCategory: e.target.selectedIndex });
    }
    selectPriority(e) {
        this.setState({ selectedPriority: e.target.selectedIndex });
    }
    changeText(ent, e) {
        this.state[ent] = e.target.value;
        this.setState(this.state);
    }   
    submitPoint() {
        //DO VALIDATION?
        const state = this.state;

        if(!state.selectedCategory) {
            return alert('Please select a Category');
        }
        
        const point = Object.assign(state.addItem, {
            description: state.description,
            category: state.categories[state.selectedCategory],
            priority: state.priorities[state.selectedPriority],
            skill: state.skill,
            yoe: state.yoe
        })

        this.props.actions.submitPoint(point);
    }
    render() {
        const { actions } = this.props;
        const state = this.state;
        const { addItem, categories, priorities } = state;

        return (
            <div className="addItemContainer">
                
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Skill{(state.selectedCategory ? ' - ' + state.categories[state.selectedCategory].title : '')}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={actions.submitPoint.bind(null, null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <form className="form" name="init" id="point-modal">

                                    <div className="form-group">
                                        <label htmlFor="catSelect">Category</label>
                                        <select onChange={this.selectCat.bind(this)} className="form-control" id="catSelect">
                                            <option value=""></option>
                                            {categories.map((c, i) => {
                                                return <option key={i} selected={state.selectedCategory === i} value={c.value}>{c.title}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="number-input">Years of experience</label>
                                        <input onChange={this.changeText.bind(this, 'yoe')} className="form-control" type="number" value={state.yoe} id="number-input" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="I_DSelect">Skill</label>
                                        <Autocomplete 
                                            getItemValue={(item) => item.label}
                                            items={state.skillsAuto}
                                            value={state.skill}
                                            shouldItemRender={matchStateToTerm}
                                            onChange={this.changeText.bind(this, 'skill')}
                                            onSelect={val => this.setState({ skill: val })}
                                            wrapperProps={{ style: { display: 'block' } }}
                                            inputProps={{ className: "form-control", id: "I_DSelect" }}
                                            renderItem={(item, isHighlighted) => 
                                                <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                    {item.label}
                                                </div>
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="prioritySelect">Priority</label>
                                        <select onChange={this.selectPriority.bind(this)} className="form-control" id="prioritySelect">
                                            {priorities.map((c, i) => {
                                                return <option key={i} selected={state.selectedPriority === i} value={c.value}>{c.title}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="descriptionTextarea">Description</label>
                                        <textarea className="form-control" id="exampleTextarea" value={state.description} onChange={this.changeText.bind(this, 'description')} placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                                    </div>

                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={actions.submitPoint.bind(null, null)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.submitPoint.bind(this)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}