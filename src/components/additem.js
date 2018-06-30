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
                { value: "", title: "" },
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
                { cat: "Business Development", label: "Finding new leads" },
                { cat: "Business Development", label: "Speaking at events" },
                { cat: "Business Development", label: "Attending conferences/conventions" },
                { cat: "Business Development", label: "Developing current leads" },
                { cat: "Business Development", label: "Presenting Capabilities" },
                { cat: "Business Development", label: "PowerPoint presentation" },
                { cat: "Business Development", label: "Writing proposals" },
                { cat: "Business Development", label: "Responding to RFPs" },
                { cat: "Business Development", label: "Admin/logistics" },
                { cat: "Business Development", label: "Facilitating meetings" },
                { cat: "Business Development", label: "Facilitating sessions" },
                { cat: "Enabling Area", label: "Business development support" },
                { cat: "Graphic Design", label: "Storyboarding simulations" },
                { cat: "Graphic Design", label: "HTML/CSS" },
                { cat: "Graphic Design", label: "Data visualization" },
                { cat: "Graphic Design", label: "Storyboarding videos" },
                { cat: "Graphic Design", label: "Motion graphic build" },
                { cat: "Graphic Design", label: "Brand/Logo design" },
                { cat: "Graphic Design", label: "Printed material design" },
                { cat: "Graphic Design", label: "User interface design" },
                { cat: "Graphic Design", label: "Photoshop" },
                { cat: "Graphic Design", label: "Illustrator" },
                { cat: "Graphic Design", label: "InDesign" },
                { cat: "Instructional Design", label: "Creative Writing" },
                { cat: "Instructional Design", label: "Camtasia" },
                { cat: "Instructional Design", label: "Project managing" },
                { cat: "Instructional Design", label: "Reviewing/editing" },
                { cat: "Instructional Design", label: "Storyboarding" },
                { cat: "Instructional Design", label: "User testing" },
                { cat: "Instructional Design", label: "Technical Writing" },
                { cat: "Instructional Design", label: "Problem Solving" },
                { cat: "Instructional Design", label: "Innovating" },
                { cat: "Instructional Design", label: "Facilitating" },
                { cat: "Instructional Design", label: "Researching" },
                { cat: "Instructional Design", label: "Wireframing" },
                { cat: "Instructional Design", label: "Captivate" },
                { cat: "Instructional Design", label: "Lectora" },
                { cat: "Leadership & Development", label: "Mentoring others" },
                { cat: "Leadership & Development", label: "Managing employees" },
                { cat: "Leadership & Development", label: "Managing teams" },
                { cat: "Leadership & Development", label: "Coaching" },
                { cat: "Project Management", label: "Financial analysis" },
                { cat: "Project Management", label: "Budget creation" },
                { cat: "Project Management", label: "Writing user stories" },
                { cat: "Project Management", label: "Evaluating stories" },
                { cat: "Project Management", label: "Reviewing/editing" },
                { cat: "Project Management", label: "Client communication (written)" },
                { cat: "Project Management", label: "Client communication (verbal)" },
                { cat: "Project Management", label: "Admin/logistics" },
                { cat: "Project Management", label: "Problem solving" },
                { cat: "Quality Assurance", label: "Editorial QA" },
                { cat: "Quality Assurance", label: "Data QA" },
                { cat: "Quality Assurance", label: "Technical QA" },
                { cat: "Quality Assurance", label: "Process QA" },
                { cat: "Quality Assurance", label: "Functional QA" },
                { cat: "Quality Assurance", label: "User Testing" },
                { cat: "Quality Assurance", label: "Acceptance Criteria Reivew" },
                { cat: "Quality Assurance", label: "Technical analysis" },
                { cat: "Quality Assurance", label: "Process analysis" },
                { cat: "Quality Assurance", label: "Financial QA" },
                { cat: "Software Development", label: "Java" },
                { cat: "Software Development", label: "Javascript" },
                { cat: "Software Development", label: "HTML" },
                { cat: "Software Development", label: "NET" },
                { cat: "Software Development", label: "C#" },
                { cat: "Software Development", label: "SQL" },
                { cat: "Software Development", label: "C++" },
                { cat: "Software Development", label: "React" },
                { cat: "Enabling Area", label: "JIRA Administration" },
                { cat: "Enabling Area", label: "Accounts Payable" },
                { cat: "Enabling Area", label: "Accounts Receivable" },
                { cat: "Enabling Area", label: "Account Reconcilitation" },
                { cat: "Enabling Area", label: "Project Setup" },
                { cat: "Enabling Area", label: "Project Close-out" },
                { cat: "Instructional Design", label: "Interviewing" },
                { cat: "Instructional Design", label: "scoring models" },
                { cat: "Instructional design", label: "Creating Facilitator Materials" },
                { cat: "Instructional design", label: "writing assessment questions" },
                { cat: "Instructional Design", label: "working with SMEs" },
                { cat: "Data Science", label: "Tableau" },
                { cat: "Data Science", label: "Alteryx" },
                { cat: "Data Science", label: "Server Knowledge" },
            ],
            certified: false,
            certText: '',
            yoe: 1
        }
        this.state.filteredSkills = this.state.skillsAuto.slice(0);

        if(this.state.addItem.rank !== undefined) { //is edit so fill out items
            let state = this.state;
            const item = state.addItem;

            Object.assign(state, item);

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
        let cat = this.state.categories[e.target.selectedIndex];
        let filteredSkills = [];
        if(cat.title) {
            this.state.skillsAuto.map(s => {
                if(s.cat === cat.title) {
                    filteredSkills.push(s);
                }
            })
        } else {
            filteredSkills = this.state.skillsAuto.slice(0);
        }
        this.setState({ selectedCategory: e.target.selectedIndex, filteredSkills });
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
            yoe: state.yoe,
            ...state
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
                                            items={state.filteredSkills}
                                            value={state.skill}
                                            shouldItemRender={matchStateToTerm}
                                            onChange={this.changeText.bind(this, 'skill')}
                                            onSelect={val => this.setState({ skill: val })}
                                            wrapperProps={{ style: { display: 'block' } }}
                                            inputProps={{ className: "form-control", id: "I_DSelect" }}
                                            renderItem={(item, isHighlighted) => 
                                                <div key={item.cat + '_' + item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
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
                                        <label htmlFor={"certText"}>Certified?</label>
                                        
                                        <span className="checkbox" onClick={e => this.setState({ certified: !state.certified })}>
                                            <i className={state.certified ? "fa fa-check-square" : 'fa fa-square'} />
                                        </span>

                                        {state.certified && <input className={"form-control"} type={"text"} id={"certText"} placeholder={"Enter certification information"} value={state.certText} onChange={e => this.setState({ certText: e.target.value })} />}
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