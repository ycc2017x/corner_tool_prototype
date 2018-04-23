var points = [];
var point_count = 0;
var p;
var svg_marginX = 50;
var svg_marginY = 50;
var editing_point = false;
var selected_point = '';
var active_form = '';
(function() {

    window.main = function() {
        /* obtain a reference to the SVG
         */
        var background, drag, vis;
        vis = d3.select('svg');
        /* --- Circle dragging ---
         */
        /* define a drag behavior
         */
        function updatePoints(point) {
            // console.log('inside updatePoints');
            //console.log(point.getAttribute('id'));
            var id = point.getAttribute('id');
            //  console.log(d3.select(point).select('circle').attr('cx'))
            //            console.log(d3.select(point).select('circle').attr('cy'))

            for (var i = 0; i < points.length; i++) {
                if (points[i].id === id) {
                    points[i].x = d3.select(point).select('circle').attr('cx');
                    points[i].y = d3.select(point).select('circle').attr('cy');
                }
            }

            //also going to use this function to update descriptions,yrs exp, etc with modal
        }

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

        background_g = vis.append('g').attr('class', 'background_g').attr('width', (vis.attr('width') + svg_marginX)).attr('height', (vis.attr('height') + svg_marginY));
        background = background_g.append('rect').attr('class', 'background').attr('width', (vis.attr('width') - svg_marginX)).attr('height', (vis.attr('height') - svg_marginY));

        /* when the user clicks the background
         */

        var background_middleX = background.attr('width') / 2;
        var background_middleY = background.attr('height') / 2;
        var background_width = background.attr('width');
        var background_height = background.attr('height');
        background_width = Number(background_width) + 18;
        background_height = Number(background_height) + 18;

        var yAxis = background_g.append('line')
            .attr('x1', background_middleX)
            .attr('y1', 0)
            .attr('x2', background_middleX)
            .attr('y2', background.attr('height'))
            .attr('stroke-width', 2)
            .attr('stroke', '#5D5179')

        var xAxis = background_g.append('line')
            .attr('x1', 0)
            .attr('y1', background_middleY)
            .attr('x2', background.attr('width'))
            .attr('y2', background_middleY)
            .attr('stroke-width', 2)
            .attr('stroke', '#5D5179')

        var intro = background_g.append('text')
            .attr('x', background_middleX)
            .attr('y', background_middleY / 2)
            .attr('text-anchor', 'middle')
            .attr('id', 'intro')
            .attr('font-size', '31px')
            .attr('color', '#5D517')
            .attr('fill', 'red')
            .text('Click anywhere on the grid to begin')





        var goodText = background_g.append('text')
            .attr('x', background_width)
            .attr('y', background_middleY / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', '#5D5179')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('writing-mode', 'tb')
            .text('Good At')

        var notGoodText = background_g.append('text')
            .attr('x', background_width)
            .attr('y', background_middleY * 1.5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#5D5179')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('writing-mode', 'tb')
            .text('Not Good At')

        var likeText = background_g.append('text')
            .attr('x', background_middleX * 1.5)
            .attr('y', background_height)
            .attr('text-anchor', 'middle')
            .attr('fill', '#5D5179')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .text('Like')

        var dontLikeText = background_g.append('text')
            .attr('x', background_middleX * .5)
            .attr('y', background_height)
            .attr('text-anchor', 'middle')
            .attr('fill', '#5D5179')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .text('Don\'t Like')


        background.on('click', null);
        background.on('click', function() {
            /* retrieve mouse coordinates
             */

            p = d3.mouse(this);
            console.log('background clicked')
            //console.log('these are the coordinates of p at this point in the function');
            //  console.log(p);
            /* create a new circle at point p
             */
            clearModal();
            $('#prompt').modal({ show: false });
            $('#prompt').modal('show');
            d3.select('#intro').remove();



            d3.event.stopPropagation();

        });

        $('[id^=submit]').click(function(e) {
            console.log('#submit clicked');
            //need to capture this data
            //console.log('submit handled');
            e.preventDefault();
            console.log("Active_form: " + active_form);

            var yrs = $(active_form + ' #number-input').val();
            //  console.log(yrs);
            var skills = $( active_form + ' div#selectHead .form-control').val();
            //  console.log(skills);
            var description = $(active_form + ' #exampleTextarea').val();
            console.log('description: ' + description);
            var priority = $(active_form + ' #prioritySelect').val();
            // console.log(color)
            var header = $('#modal_title').text();
            console.log('header: ' + header);
            var category = header.substring(header.indexOf('~') + 1);
            var form = active_form;
            console.log('category: ' + category);
            // console.log('POINT COUNT = POINTS.LENGTH');
            if (!editing_point) {
                //   console.log('point count after increment: ' + point_count);

                point_count++;
                newPoint(p, yrs, skills, description, priority,category, form);
                clearModal();
            } else {
                // alert('submit while editing fired, check console');
                /*  console.log(yrs);
                  console.log(skills);
                  console.log(description);
                  console.log(color)*/
                modifyPoint(yrs, skills, description, priority, selected_point,category, form);
                editing_point = false;
                selected_point = '';
            }
        });

        $('#prompt').on('hidden.bs.modal', function() {
            //alert('modal closing')
            editing_point = false;

        });

    /*   $('#prompt').on('hide.bs.modal', function(event) {

            //The default close button class is "close", if you change it please change the selector
            if ($(document.activeElement).hasClass('close')) {
                console.log('The user close the modal dialog using the Close Button');
            } else {
                console.log('The user close the modal dialog using Backdrop or Keyboard ESC key');
            }
        });*/

        $(document).on("mouseenter", "[id^=skill_number]", function() {
            $(this).css('cursor', 'pointer').css('border-color', '#5D5179').css('border-style', 'double');
        });

        $(document).on("mouseleave", "[id^=skill_number]", function() {
            $(this).css('cursor', 'arrow').css('border-color', 'black').css('border-style', 'solid');
        });

        $(document).on("click", "[id^=skill_number]", function() {
            //  console.log('skill clicked');
            var id = $(this).attr('id');
            // console.log(id);
            var point_num = id.substr(id.length - 1, 1);
            //    console.log(point_num);
            show_description(id, point_num);

        });

        $(document).on("click", "[id^=edit]", function() {
            //  console.log('skill clicked');
            var id = $(this).attr('id');
            // console.log(id);
            var point_num = id.substr(id.length - 1, 1);
            console.log("edit point number: " + point_num);
            //show_description(id, point_num);
            editPoint(point_num);
        });

        $(document).on("click", "[id^=delete]", function() {
            //  console.log('skill clicked');
            var id = $(this).attr('id');
            // console.log(id);
            var point_num = id.substr(id.length - 1, 1);
            console.log("delete point number: " + point_num);
            //    console.log(point_num);
            //show_description(id, point_num);
            deletePoint(point_num);
            //point_count--;
        });

        /*
                $(document).on("click", "[id^=skill_number]", function() {
                    console.log('skill clicked');
                    var id = $(this).attr('id');
                    console.log(id);
                    var point_num = id.substr(id.length - 1, 1);
                    console.log(point_num);
                    show_description(id, point_num);

                });*/

        function clearModal() {
          //  alert('modal clearing, active_form: ' + active_form);
            $('#modal_title').text("Create New Point");
            $(active_form + ' #number-input').val("");
            $(active_form  + ' div#selectHead .form-control').val("");
            $(active_form + ' #exampleTextarea').val("");
            $(active_form + ' #prioritySelect').val("Medium");
            $('#catSelect').val("");
            $("#point-modal").show().siblings().hide();
            active_form = '';
        }




        /*
        * going to need a category value stored in the point so you can toggle the different form types
        *
        */
        function resetModal(p) {
            console.log(p);
           // alert('modal reset')
            $(p.form).show().siblings().hide();
            $('#modal_title').text("Edit Point ~" + p.category);
            $(active_form + ' #number-input').val(p.yrs);
            $(active_form + ' div#selectHead .form-control').val(p.skills);
            $(active_form + ' #exampleTextarea').val(p.description);
            $(active_form + ' #prioritySelect').val(p.priority);
        }

        function deletePoint(point_num) {
            var index;
            point_num = parseInt(point_num);
            for (var i = 0; i < points.length; i++) {
                if (points[i].count === point_num) {
                    index = i;
                    //   console.log(points[i]);
                    break;
                }
            }
            //    console.log('deleting point number: ' + point_num);
            points.splice(index, 1);
            $('#srow' + point_num).remove();
            //$('#description' + point_num).remove();
            $('#drow' + point_num).remove();
            d3.select('#node' + point_num).remove();
            //  console.log('elements removed');
        }

        function editPoint(point_num) {
            //  console.log('inside of editPoints');
            editing_point = true;
            selected_point = point_num;
            //  console.log('point_num = ' + point_num);
            //  console.log("typeof point_num = " + typeof(point_num));
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


           // console.log(p);
            active_form = p.form;
            resetModal(p);
            $('#prompt').modal({ show: false });
            $('#prompt').modal('show');

        }

        function modifyPoint(yrs, skills, description, priority, selected_point,category, form) {
            // alert('inside of modifyPoint');
            var index;
            // console.log(selected_point);
            selected_point = parseInt(selected_point);
            for (var i = 0; i < points.length; i++) {
                if (points[i].count === selected_point) {
                    index = i;
                   // alert('point found in modifyPoint')
                    break;
                }
            }
            console.log("points[index] before modification in modifyPoint");
            console.log(points[index]);
            points[index].yrs = yrs;
            points[index].skills = skills;
            points[index].description = description;
            points[index].priority = priority;
            points[index].color = pToC(priority);
            points[index].category = category;
            d3.select('.circle-' + selected_point)
                .attr('fill', function(d) { return pToC(d.priority); });
            updateSkillMenu(points[index], selected_point);

        }

        function pToC(priority) {
            if (priority === "High") return "red";
            else if (priority === "Medium") return "yellow";
            else if (priority === "Low") return "green";
        }

        function updateSkillMenu(point, selected_point) {
            $('#skill_number' + point.count + ' p').text(' Skill ' + point.count + ': ' + point.skills + ' ~ ' + point.category);
            $('#description' + point.count + ' p').text(point.description);

        }

        function show_description(id, point_num) {
            //  console.log('show_description called');
            //console.log('drow' + point_num);
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



        function newPoint(p, years, skills, description, priority, category, form) {
            console.log('inside of newPoint');
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
            // console.log(p);
            points.push(point);

            //console.log(points);
            var node = background_g.selectAll('g')
                .data(points)
                .enter().append('g')
                .attr('class', function(d) { return 'spot'; })
                .attr('id', function(d, i) { return d.id }).call(drag);


            //console.log(node.data());



            node.append('circle')
                .attr('class', function(d) { return 'circle-' + d.count; })
                .attr('r', function(d) { return d.radius * 10; })
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('fill', function(d) { return pToC(d.priority); });

            var text = node.append("text")
                .attr('class', 'start')
                .attr("x", function(d) { return d.x + d.radius / 2; })
                .attr("y", function(d) { return d.y + (d.radius / 2) * 2; })
                .attr("text-anchor", "middle")
                .style("fill", "black")
                .text(function(d) { return d.count; });

            addSkill(point);
            addDescription(point);
            // console.log(text.data());
        }


        $("#catSelect").on("change", function() {
            $("#modal_title").append(" ~ " + $('#catSelect option:selected').text());
            var form = $('#catSelect option:selected').val() + '_form';
            active_form = '#' + form;
            console.log('form: ' + form);
            $('div#selectHead .form-control').attr('id', $('#catSelect option:selected').val() + 'Select');
            $('#' + form).show().siblings().hide();

        })

        function addSkill(point) {
            $('#skill_menu').append('<div class=\"row\"><div class=\"skill_row\" id=\"srow' + point.count + '\"><div id=\"skill_number' + point.count + "\"><i class=\"fa fa-plus-square\" aria-hidden=\"true\"></i>" +
                "<p> Skill " + point.count +  ': ' + point.skills + " ~ " + point.category + "</p></div></div><div class=\"desc_rowD\" id=\"drow" +
                point.count + "\" ><div id=\"description" + point.count +
                "\" class=\"skill_descD\"></div>" + "</div></div>");
        }

        function addDescription(point) {
            console.log(point);
            $('#description' + point.count).append('<div class=\"row\">')
            $('#description' + point.count).append('<p>' + point.description + '</p></div>');
            $('#description' + point.count).append('<div class=\"row\"><div class=\"mod_box\">' +
                "<div class=\"col-md-9\"></div><div class=\"col-md-1\"><i class=\"fa fa-pencil-square-o\" id=\"edit" + point.count + "\" aria-hidden=\"true\"></i></div>" +
                "<div class=\"col-md-1\"><i class=\"fa fa-trash-o\" id=\"delete" + point.count + "\" aria-hidden=\"true\"></i></div><div class=\"col-md-1\"></div></div></div>");

        }

    };

}).call(this);