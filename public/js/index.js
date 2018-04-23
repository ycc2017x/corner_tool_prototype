var points = [];
var point_count = 0;
var p;
var svg_marginX = 50;
var svg_marginY = 50;
var editing_point = false;
var selected_point = '';
var active_form = '';
var user_id = '';
/*
window.onload = function() {
    alert('onload function fired from public/index.js');
}*/

(function() {

    /*
     *   Going to define a function that sets the global points array equal to the db_points object returned from the server
     * then going to bind all of the point data to the svg objects using d3 (going to need a points_init function)
     */
    // alert('onload function fired from public/index.js');
    $(function() {
        user_id = $('#userID').text();
        //console.log(user_id);
        $.ajax({
            url: '/users/points',
            data: JSON.stringify({ id: user_id }),
            type: 'POST',
            contentType: 'application/json',
            success: function(response) {
                //console.log(response);
                var returned_user = response;
                //console.log(typeof(returned_user));
                //console.log(response["user"]);
                //console.log(response["user"].points);
                //console.log(response["user"].tutorial);
                var tutorial_watched = response["user"].tutorial;

                //console.log(response["user"].activated);
                var returned_points = response["user"].points;
                //console.log(returned_points);
                if (returned_points.length > 0) {
                    populate(returned_points);
                    /* d3.select('#intro').remove();
                      d3.select('#text_bg').remove(); //gets rid of intro text from svg*/
                }

                if (!tutorial_watched) {
                    //need to launch a modal with instructions on how to use the tool
                    $('#tutorial').modal({ show: false }); //inits the modal
                    $('#tutorial').modal('show'); //creates a new modoal

                    seenTutorial();
                } else {
                    //consider launching a welcome back message
                }
                // //console.log(response[0]);
            }
        });
    });

    //populates the app on load
    function populate(returned_points) {

        //console.log("in populate");
        //console.log(returned_points);
        //console.log(returned_points[0]);
        points = returned_points;

        //need to initialize point_count here based off the length of the array
        //console.log(points);
        point_count = initializePointCount(); // need to get the last point in the array and add one
        //console.log("point_count" + point_count);
        for (var i = 0; i < points.length; i++) {
            //console.log(points[i]);
            addSkill(points[i]); //adds a skill to the skill menu
            addDescription(points[i]); //adds a description to the skill menu
        }

        /*
        for(var point in points){
            //console.log("adding to skill menu on load inside of populate");
            addSkill(point);//adds a skill to the skill menu
            addDescription(point);//adds a description to the skill menu

        }*/
        drawSVG();
    }


    function initializePointCount() {
        return points[points.length - 1].count;
    }

    function drawSVG() {

        // alert("draw SVG called");
        //creates the g element that we're appending our data and child SVG elements to,calls the drag function on this object
        var node = background_g.selectAll('g')
            .data(points)
            .enter().append('g')
            .attr('class', function(d) { return 'spot'; })
            .attr('id', function(d, i) { return d.id }).call(drag);


        ////console.log(node.data());


        //adds the svg circle
        node.append('circle')
            .attr('class', function(d) { return 'circle-' + d.count; })
            .attr('r', function(d) { return d.radius * 10; })
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
            .attr('fill', function(d) { return pToC(d.priority); });

        /*   //adds text on top of the circle
           var text = node.append("text")
               .attr('class', 'start')
               .attr("x", function(d) { return d.x + d.radius / 2; })
               .attr("y", function(d) { return d.y + (d.radius / 2) * 2; })
               .attr("text-anchor", "middle")
               .style('font-weight', 'bold')
               .style("fill", "white")
               .style("font-size", "21px")
               .text(function(d) { return d.count; });*/

        //console.log("inside of drawSVG() before text appended");
        //adds text on top of the circle
        var text = node.append("text")
            .attr('class', 'start')
            .attr("x", function(d) {
                //console.log(typeof(parseInt(d.x)));
                //console.log(typeof(d.radius / 2));
                return parseInt(d.x) + d.radius / 2;
            })
            .attr("y", function(d) { return parseInt(d.y) + (d.radius / 2) * 2; })
            .attr("text-anchor", "middle")
            .style('font-weight', 'bold')
            .style("fill", "#FFF")
            .style("font-size", "21px")
            .text(function(d) { return d.count; });


    }

    function updateDatabase() {
        //console.log("updateDatabase called");
        $(function() {
            $.ajax({
                url: '/users/update',
                data: JSON.stringify({ db_points: points, id: user_id }),
                type: 'POST',
                contentType: 'application/json',
                success: function(response) {
                    //console.log(response);

                    // //console.log(response[0]);
                }
            });
        });
    }

    function seenTutorial() {
        //console.log("seenTutorial called");
        $(function() {
            $.ajax({
                url: '/users/tutorialseen',
                data: JSON.stringify({ id: user_id }),
                type: 'POST',
                contentType: 'application/json',
                success: function(response) {
                    //console.log(response);

                    // //console.log(response[0]);
                }
            });
        });
    }
    /*  $(function() {
        $.ajax({
            url: '/users/points/' + user_id,
            contentType: 'application/json',
            success: function(response){
                //console.log(response);
            }
        });
      });*/

    // window.main = function() {
    /* obtain a reference to the SVG
     */
    var background, drag, vis;
    vis = d3.select('svg');
    /* --- Circle dragging ---
     */
    /* updatePoints updates the global array data after a circle is dragged
     */
    function updatePoints(point) {
        // //console.log('inside updatePoints');
        ////console.log(point.getAttribute('id'));
        var id = point.getAttribute('id');
        //  //console.log(d3.select(point).select('circle').attr('cx'))
        //            //console.log(d3.select(point).select('circle').attr('cy'))

        //find a way to use a map that can be accessed by id to improve performance 
        for (var i = 0; i < points.length; i++) {
            if (points[i].id === id) {
                points[i].x = d3.select(point).select('circle').attr('cx');
                points[i].y = d3.select(point).select('circle').attr('cy');
            }
        }
        updateDatabase();
        //also going to use this function to update descriptions,yrs exp, etc with modal
    }

    /*
     * defines the drag behavior the SVG object that is tied to the data points
     */
    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);

    function dragstarted(d) {
        d3.select(this).classed("spot", false);
        d3.select(this).classed("active", true);

    }

    function dragged(d) {
        d3.select(this).select("text")
            .attr("x", function(d) { return d.x = d3.event.x; })
            .attr("y", function(d) { return d.y = d3.event.y; });
        d3.select(this).select("circle")
            .attr("cx", function(d) { return d.x = d3.event.x; })
            .attr("cy", function(d) { return d.y = d3.event.y; });
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
        d3.select(this).classed("spot", true);
        updatePoints(this);
    }
    /* --- Circle creation ---
     */
    /* create a rectangle to serve as background
     */
    var LABEL_BUFFER = 20;

    background_g = vis.append('g').attr('class', 'background_g').attr('width', (vis.attr('width') + svg_marginX)).attr('height', (vis.attr('height') + svg_marginY));
    background = background_g.append('rect').attr('class', 'background').attr('x', LABEL_BUFFER * 2.5).attr('width', (vis.attr('width') - svg_marginX)).attr('height', (vis.attr('height') - svg_marginY));



    var background_middleX = background.attr('width') / 2 + LABEL_BUFFER * 2.5;
    var background_middleY = background.attr('height') / 2;
    var background_width = background.attr('width');
    var background_height = background.attr('height');
    background_width = Number(background_width) + 18;
    background_height = Number(background_height) + 18;
    var axis_cast = Number(background.attr('width')) + LABEL_BUFFER * 2.5;


    var yAxis = background_g.append('line')
        .attr('x1', background_middleX)
        .attr('y1', 0)
        .attr('x2', background_middleX)
        .attr('y2', background.attr('height'))
        .attr('stroke-width', 7)
        .attr('stroke', '#bfbfbf')

    var xAxis = background_g.append('line')
        .attr('x1', 0 + LABEL_BUFFER * 2.5)
        .attr('y1', background_middleY)
        .attr('x2', axis_cast)
        .attr('y2', background_middleY)
        .attr('stroke-width', 7)
        .attr('stroke', '#bfbfbf')

    //axis label
    var goodText = background_g.append('text')
        .attr('x', 0 + LABEL_BUFFER)
        .attr('y', background_middleY / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFF')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .attr('writing-mode', 'tb')
        .text('Good At')

    //axis label
    var notGoodText = background_g.append('text')
        .attr('x', 0 + LABEL_BUFFER)
        .attr('y', background_middleY * 1.5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFF')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .attr('writing-mode', 'tb')
        .text('Not Good At')

    //axis label
    var likeText = background_g.append('text')
        .attr('x', background_middleX * 1.5)
        .attr('y', background_height + LABEL_BUFFER)
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFF')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .text('Like')

    //axis label
    var dontLikeText = background_g.append('text')
        .attr('x', background_middleX * .5)
        .attr('y', background_height + LABEL_BUFFER)
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFF')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .text('Don\'t Like')


    /**********LEGACY************************/
    /*
     *
     *   The code below is for the SVG intro message
     *   decided to use a modal instead
     *
     */

    /* var text_bg = background_g.append('rect')
        .attr('x', background_middleX * .33)
        .attr('y', background_middleY * .33)
        .attr('width', background_width * .7)
        .attr('height', background_height / 8)
        .attr('rx', 5)
        .attr('id', 'text_bg')
        .attr('ry', 5)
        .attr("fill", "#352063")
*/
    // //console.log("BEFORE BACKGROUND TEXT ADDED");
    ////console.log(points);
    //intro text
    /* var intro = background_g.append('text')
         .attr('x', background_middleX * .96)
         .attr('y', background_middleY / 2)
         .attr('text-anchor', 'middle')
         .attr('id', 'intro')
         .attr('font-size', '31px')
         .attr('font-style', 'italic')
         .attr('color', '#FFF')
         .attr('fill', '#FFF')
         .text('Click anywhere on the grid to begin')

    */

    background.on('click', null); //clears event handler
    //handles a click on the SVG background
    background.on('click', function() {
        /* retrieve mouse coordinates
         */

        p = d3.mouse(this); //gets mouse coordinates
        //console.log('background clicked')
        ////console.log('these are the coordinates of p at this point in the function');
        //  //console.log(p);
        /* create a new circle at point p
         */
        // alert('about to show modal');
        clearModal(); //clears the modal after a click on a new point

        $('#prompt').modal({ show: false }); //inits the modal
        $('#prompt').modal('show'); //creates a new modoal
        d3.select('#intro').remove(); //removes the intro from the screen, CLEAN THIS UP, only needs to fire once

        d3.select('#text_bg').remove();

        d3.event.stopPropagation(); //stops click bubbling

    });

    $('#tutorial_button').click(function(e) {
        e.preventDefault();
        $('#tutorial').modal({ show: false }); //inits the modal
        $('#tutorial').modal('show'); //creates a new modoal


    })

    
    //event handler for the modal submit button
    $('[id^=submit]').click(function(e) {
        //console.log('#submit clicked');
        //need to capture this data
        ////console.log('submit handled');
        e.preventDefault();
        //console.log("Active_form: " + active_form);

        //saves all of the form data in local vars
        var yrs = $(active_form + ' #number-input').val();
        //  //console.log(yrs);
        var skills = $(active_form + ' div#selectHead .form-control').val();
        //  //console.log(skills);
        var description = $(active_form + ' #exampleTextarea').val();
        //console.log('description: ' + description);
        var priority = $(active_form + ' #prioritySelect').val();
        // //console.log(color)
        var header = $('#modal_title').text();
        //console.log('header: ' + header);
        var category = header.substring(header.indexOf('~') + 1);
        var form = active_form;
        //console.log('category: ' + category);
        // //console.log('POINT COUNT = POINTS.LENGTH');

        //makes a new point if the Create point modal is open, editing point gets triggered from the skills menu
        if (!editing_point) {
            //   //console.log('point count after increment: ' + point_count);

            point_count++;
            newPoint(p, yrs, skills, description, priority, category, form);
            clearModal();
        } else {
            // alert('submit while editing fired, check console');
            /*  //console.log(yrs);
              //console.log(skills);
              //console.log(description);
              //console.log(color)*/
            modifyPoint(yrs, skills, description, priority, selected_point, category, form);
            editing_point = false;
            selected_point = '';
        } //modifies the point if the user click the edit option on a point from the skills menu
    });

    $('#prompt').on('hidden.bs.modal', function() {
        //alert('modal closing')
        editing_point = false;

    }); //turns editing point off when the modal closes

    /*   $('#prompt').on('hide.bs.modal', function(event) {

            //The default close button class is "close", if you change it please change the selector
            if ($(document.activeElement).hasClass('close')) {
                //console.log('The user close the modal dialog using the Close Button');
            } else {
                //console.log('The user close the modal dialog using Backdrop or Keyboard ESC key');
            }
        });*/
    //I believe this is a hover state
    $(document).on("mouseenter", "[id^=skill_number]", function() {
        $(this).css('cursor', 'pointer').css('border-color', '#5D5179').css('border-style', 'double');
    });
    //Believed to be a hover state
    $(document).on("mouseleave", "[id^=skill_number]", function() {
        $(this).css('cursor', 'arrow').css('border-color', 'black').css('border-style', 'solid');
    });

    //expands skill menu on click
    $(document).on("click", "[id^=skill_number]", function() {
        //  //console.log('skill clicked');
        var id = $(this).attr('id');
        // //console.log(id);
        var point_num = id.substr(id.length - 1, 1);
        //    //console.log(point_num);
        show_description(id, point_num);

    });


    //event handler for edit click, calls editPoint(point_num). Triggered by click edit icon in skill menu
    $(document).on("click", "[id^=edit]", function() {
        //  //console.log('skill clicked');
        var id = $(this).attr('id');
        // //console.log(id);
        var point_num = id.substr(id.length - 1, 1);
        //console.log("edit point number: " + point_num);
        //show_description(id, point_num);
        editPoint(point_num);
    });
    //event handler for delete icon click, calls deletePoint(point_num). Triggered by clicking trash can in skill menu
    $(document).on("click", "[id^=delete]", function() {
        //  //console.log('skill clicked');
        var id = $(this).attr('id');
        // //console.log(id);
        var point_num = id.substr(id.length - 1, 1);
        //console.log("delete point number: " + point_num);
        //    //console.log(point_num);
        //show_description(id, point_num);
        deletePoint(point_num);
        //point_count--;
    });

    /*
            $(document).on("click", "[id^=skill_number]", function() {
                //console.log('skill clicked');
                var id = $(this).attr('id');
                //console.log(id);
                var point_num = id.substr(id.length - 1, 1);
                //console.log(point_num);
                show_description(id, point_num);

            });*/

    //clears the modal
    function clearModal() {
        //  alert('modal clearing, active_form: ' + active_form);
        $('#modal_title').text("Create New Point");
        $(active_form + ' #number-input').val("");
        $(active_form + ' div#selectHead .form-control').val("");
        $(active_form + ' #exampleTextarea').val("");
        $(active_form + ' #prioritySelect').val("Medium");
        $('#catSelect').val("");
        $("#point-modal").show().siblings().hide();
        active_form = '';
    }




    /*
     * going to need a category value stored in the point so you can toggle the different form types
     *   resets the modal with the data from the point that is being edited
     */
    function resetModal(p) {
        //console.log(p);
        // alert('modal reset')
        $(p.form).show().siblings().hide();
        $('#modal_title').text("Edit Point ~" + p.category);
        $(active_form + ' #number-input').val(p.yrs);
        $(active_form + ' div#selectHead .form-control').val(p.skills);
        $(active_form + ' #exampleTextarea').val(p.description);
        $(active_form + ' #prioritySelect').val(p.priority);
    }

    //deletes point by finding the index in the global array, 
    //removing it, removing the point from the skill menu, and 
    //deleting the SVG element that the point is binded to
    function deletePoint(point_num) {
        var index;
        point_num = parseInt(point_num);
        for (var i = 0; i < points.length; i++) {
            if (points[i].count === point_num) {
                index = i;
                //   //console.log(points[i]);
                break;
            }
        }
        //    //console.log('deleting point number: ' + point_num);
        points.splice(index, 1);
        $('#srow' + point_num).remove();
        //$('#description' + point_num).remove();
        $('#drow' + point_num).remove();
        d3.select('#node' + point_num).remove();

        updateDatabase();
        //  //console.log('elements removed');
    }

    /*
     *   Edit point, calls the reset modal function where the modal is repopulated
     * and the editing_point variable is set to true so that the event handler that 
     * handles the modal submit knows that it's modifying an existing point instead 
     * of creating a new point.
     */
    function editPoint(point_num) {
        //  //console.log('inside of editPoints');
        editing_point = true;
        selected_point = point_num;
        //  //console.log('point_num = ' + point_num);
        //  //console.log("typeof point_num = " + typeof(point_num));
        point_num = parseInt(point_num);
        //   alert('finna edit point: ' + (parseInt(point_num) - 1));
        var index;
        var p;
        for (var i = 0; i < points.length; i++) {
            if (points[i].count === point_num) {
                // index = i;
                p = points[i];
                //  alert('point found in editPoint')
                break;
            }
        }


        // //console.log(p);
        active_form = p.form;
        resetModal(p);
        $('#prompt').modal({ show: false });
        $('#prompt').modal('show');

    }

    /*
     * modifyPoint(yrs, skills, description, priority, selected_point,category, form):
     * called from the modal submit handler when the global indicator editing_point is true,
     * function updates the global point array as well as the data in the skill menu, based on 
     * the point.
     */
    function modifyPoint(yrs, skills, description, priority, selected_point, category, form) {
        // alert('inside of modifyPoint');
        var index;
        // //console.log(selected_point);
        selected_point = parseInt(selected_point);
        for (var i = 0; i < points.length; i++) {
            if (points[i].count === selected_point) {
                index = i;
                // alert('point found in modifyPoint')
                break;
            }
        }
        //console.log("points[index] before modification in modifyPoint");
        //console.log(points[index]);
        points[index].yrs = yrs;
        points[index].skills = skills;
        points[index].description = description;
        points[index].priority = priority;
        points[index].color = pToC(priority);
        points[index].category = category;
        d3.select('.circle-' + selected_point)
            .attr('fill', function(d) { return pToC(d.priority); });
        updateSkillMenu(points[index], selected_point);

        //going to update database here 

        updateDatabase();

    }

    /*
     *   Converts from priority to a color
     */
    function pToC(priority) {
        if (priority === "High") return "#990000";
        else if (priority === "Medium") return "#aca800";
        else if (priority === "Low") return "#006600";
    }

    /*
     *   Updates the skill menu by changing the text of the skill header and the description
     * accepts point object and the selected point as parameters (may not need the selected_point ;/)
     */
    function updateSkillMenu(point, selected_point) {
        $('#skill_number' + point.count + ' p').text(' Skill ' + point.count + ': ' + point.skills + ' ~ ' + point.category);
        $('#description' + point.count + ' p').text(point.description);

    }

    /*
     * Makes the description visible and highlights the node on the grid
     */
    function show_description(id, point_num) {
        //  //console.log('show_description called');
        ////console.log('drow' + point_num);
        $('#drow' + point_num).toggleClass('desc_rowD desc_rowA');
        // highlightNode(id, point_num);

        var node = d3.select('#node' + point_num);
        var class_ = node.attr('class');
        if (class_ === 'spot') {
            node.attr('class', function(d) { return 'active' });
        }

        if (class_ === 'active') {
            node.attr('class', function(d) { return 'spot' });
        }
    }


    /*
     * Creates a new point, called from the modal submit function.
     * Creates a point object, adds it to the global array, and creates 
     * the svg object. 
     *
     * PLACE AJAX CREATE/UPDATE CALL HERE
     */
    function newPoint(p, years, skills, description, priority, category, form) {
        //console.log('inside of newPoint');
        var point = {
            x: p[0],
            y: p[1],
            radius: 2,
            priority: priority,
            color: pToC(priority),
            count: point_count,
            id: 'node' + point_count,
            yrs: years,
            skills: skills,
            description: description,
            category: category,
            form: form

        };
        // //console.log(p);
        points.push(point);

        ////console.log(points);

        //creates the g element that we're appending our data and child SVG elements to,calls the drag function on this object
        var node = background_g.selectAll('g')
            .data(points)
            .enter().append('g')
            .attr('class', function(d) { return 'spot'; })
            .attr('id', function(d, i) { return d.id }).call(drag);


        ////console.log(node.data());


        //adds the svg circle
        node.append('circle')
            .attr('class', function(d) { return 'circle-' + d.count; })
            .attr('r', function(d) { return d.radius * 10; })
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
            .attr('fill', function(d) { return pToC(d.priority); });

        //adds text on top of the circle
        var text = node.append("text")
            .attr('class', 'start')
            .attr("x", function(d) { return d.x + d.radius / 2; })
            .attr("y", function(d) { return d.y + (d.radius / 2) * 2; })
            .attr("text-anchor", "middle")
            .style('font-weight', 'bold')
            .style("fill", "#FFF")
            .style("font-size", "21px")
            .text(function(d) { return d.count; });

        addSkill(point); //adds a skill to the skill menu
        addDescription(point); //adds a description to the skill menu
        // //console.log(text.data());

        updateDatabase();
    }


    //Event listener for the category form, shows the industry specific form on change
    $("#catSelect").on("change", function() {
        $("#modal_title").append(" ~ " + $('#catSelect option:selected').text());
        var form = $('#catSelect option:selected').val() + '_form';
        active_form = '#' + form;
        //console.log('form: ' + form);
        $('div#selectHead .form-control').attr('id', $('#catSelect option:selected').val() + 'Select');
        $('#' + form).show().siblings().hide();

    })

    //adds skill to skill menu, accepts point data
    function addSkill(point) {
        $('#skill_menu').append('<div class=\"row\"><div class=\"skill_row\" id=\"srow' + point.count + '\"><div id=\"skill_number' + point.count + "\"><i class=\"fa fa-plus-square\" aria-hidden=\"true\"></i>" +
            "<p> Skill " + point.count + ': ' + point.skills + " ~ " + point.category + "</p></div></div><div class=\"desc_rowD\" id=\"drow" +
            point.count + "\" ><div id=\"description" + point.count +
            "\" class=\"skill_descD\"></div>" + "</div></div>");
    }

    //adds description to the skill menu
    function addDescription(point) {
        //console.log(point);
        $('#description' + point.count).append('<div class=\"row\">')
        $('#description' + point.count).append('<p>' + point.description + '</p></div>');
        $('#description' + point.count).append('<div class=\"row\"><div class=\"mod_box\">' +
            "<div class=\"col-md-9\"></div><div class=\"col-md-1\"><i class=\"fa fa-pencil-square-o\" id=\"edit" + point.count + "\" aria-hidden=\"true\"></i></div>" +
            "<div class=\"col-md-1\"><i class=\"fa fa-trash-o\" id=\"delete" + point.count + "\" aria-hidden=\"true\"></i></div><div class=\"col-md-1\"></div></div></div>");

    }



    // };

}).call(this); //calls the script