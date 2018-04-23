<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Corner Tool</title>
    <link type="text/css" href="css/index.css" rel="stylesheet" />
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.js" charset="utf-8"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://use.fontawesome.com/6b437719c8.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>

<body onload="main()">
    <header>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <h1 id="title">Corner Tool</h1>
            </div>
            <div class="col-md-3"></div>
        </div>
    </header>
    <section>
        <div class="row">
            <div class="col-md-6">
                <svg class="img-fluid" width="760" height="760">
                </svg>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4">
                <div id="skill_menu">
                    <div class="row">
                        <div class="skill_row">
                            <div id="skill_title">
                                <h2>Skills</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <a href="http://yourcornerconsulting.com/feedback/" class="btn btn-default btn-lg" role="button">Click here to leave Feedback</a>
            </div>
            <div class="col-md-9"></div>
        </div>
        <div id="prompt" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="modal_title">Create New Point<span></span></h4>
                    </div>
                    <div class="modal-body">
                        <form class="form" name="init" id="point-modal">
                            <div class="form-group row">
                                <label for="catSelect">Category</label>
                                <select class="form-control" id="catSelect">
                                    <option value="" selected="selected"></option>
                                    <option value="I_D">Instructional Design</option>
                                    <option value="S_D">Software Development</option>
                                    <option value="P_M">Project Management</option>
                                    <option value="G_D">Graphic Design</option>
                                    <option value="B_D">Business Development</option>
                                    <option value="Q_A">Quality Assurance</option>
                                    <option value="E_A">Enabling Area</option>
                                    <option value="L_D">Leadership & Development</option>
                                    <option value="D_S">Data Science</option>
                                    <option value="skill">Other</option>
                                </select>
                            </div>
                        </form>
                        <!--<form class="form" name="skill_form" id="skill_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="skillSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="skillSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submit" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form> -->
                        <form class="form" name="I_D_form" id="I_D_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="I_DSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="I_DSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitI_D" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="S_D_form" id="S_D_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="S_DSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="S_DSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitS_D" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="P_M_form" id="P_M_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="P_MSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="P_MSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitP_M" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="G_D_form" id="G_D_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="G_DSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="G_DSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitG_D" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="B_D_form" id="B_D_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="B_DSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="B_DSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitB_D" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="Q_A_form" id="Q_A_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="Q_ASelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="Q_ASelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitQ_A" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="E_A_form" id="E_A_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="E_ASelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="E_ASelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitE_A" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="L_D_form" id="L_D_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="L_DSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="L_DSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitL_D" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="D_S_form" id="D_S_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="D_SSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="D_SSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitD_S" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                        <form class="form" name="skill_form" id="skill_form" style="display:none">
                            <div class="form-group row">
                                <label for="number-input" class="col-2 col-form-label">Years of experience</label>
                                <div class="col-10">
                                    <input class="form-control" type="number" value="2" id="number-input">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="skillSelect">Skill</label>
                                <div class="col-10" id="selectHead">
                                    <input class="form-control" type="text" value="" id="skillSelect">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="prioritySelect">Priority</label>
                                <select class="form-control" id="prioritySelect">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label for="descriptionTextarea">Description</label>
                                <textarea class="form-control" id="exampleTextarea" placeholder="Write a short description describing your experience with this skill" rows="3"></textarea>
                            </div>
                            <button type="submit" id="submitskill" class="btn btn-default" data-dismiss="modal">Just Gonna Send It!!</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="results_display"></div>
    <footer>
        <script src="js/index.js"></script>
        <script type="text/javascript" src="js/autocomplete.js"></script>
        <script src="js/B_D.js"></script>
        <script src="js/D_S.js"></script>
        <script src="js/E_A.js"></script>
        <script src="js/G_D.js"></script>
        <script src="js/I_D.js"></script>
        <script src="js/L_D.js"></script>
        <script src="js/P_M.js"></script>
        <script src="js/Q_A.js"></script>
        <script src="js/S_D.js"></script>
    </footer>
</body>

</html>