		var x_cor = [];
		var y_cor = [];
		var inside_nodes = [];
		var adjacent = [];
		var i;
		for(i = 0;i <100;i += 1) {
			adjacent[i] = [];
		}
		var a_canvas;
		var a_context;
		var color = {
				0 :"red",
				1 :"blue",
				2 :"green",
				3 :"yellow",
				4 :"orange",
				5 :"magenta",
				6 :"#00FF00",
				7 :"#33FFFF",
				8 :"white",
				9 :"black"
		};
		
		var draw_canvas = function() {
                        a_canvas = document.getElementById("a");
                        a_context = a_canvas.getContext("2d");
			a_context.fillStyle = '#FFFFCC';
                        a_context.fillRect(0,0,650,450);
			a_context.moveTo(0.5,0);
                        a_context.lineTo(0.5,450);
                        a_context.moveTo(0.5,450);
                        a_context.lineTo(650,450);
                        a_context.moveTo(650,450);
                        a_context.lineTo(650,0.5);
                        a_context.moveTo(0,0.5);
                        a_context.lineTo(650,0.5);
                        a_context.strokeStyle = "#f0c";
                        a_context.stroke();     
                }

		var add_node = function (e) {
                        var x = e.pageX;
                        var y = e.pageY;
                        
	                x = x - a_canvas.offsetLeft;
                        y = y - a_canvas.offsetTop;
			x_cor.push(x);
			y_cor.push(y);
			a_context.beginPath();
                        a_context.arc(x,y,10,0,Math.PI * 2,true);
                        a_context.fillStyle = "#a0f"
                        a_context.fill();
                                             
                }
 
		var start_draw_node = function ()  {
                        a_button = document.getElementById("b1");
                        a_button.style.color="#f0c";
                        a_canvas.addEventListener("click",add_node,false);
                }

                var end_node = function () {
			a_button = document.getElementById("b2");
                        a_button.style.color="red";
                        a_canvas.removeEventListener("click",add_node,false);
		}
		var check_edge_cord = function (e) {
			var x = e.pageX;
                        var y = e.pageY;
                        			
                        x = x - a_canvas.offsetLeft;
                        y = y - a_canvas.offsetTop;
			for(i = 0;i < x_cor.length;i ++) {
				if(((x > (x_cor[i]-10)) && (x < (x_cor[i]+10))) && ((y > (y_cor[i]- 10)) && (y < (y_cor[i] + 10)))) {
					inside_nodes.push(i);
				}
			}
		}
		var add_edge = function () {
			a_button = document.getElementById("b3");
                        a_button.style.color="#f0c";
			a_canvas.addEventListener("click",check_edge_cord,false);
		}
		var fun_draw_edge = function(node1,node2) {
			a_context.moveTo(x_cor[node1],y_cor[node1]);
			a_context.lineTo(x_cor[node2],y_cor[node2]);	
			a_context.strokeStyle = "#A000f";
			a_context.stroke();
		}
		var draw_edge = function () {
			a_button = document.getElementById("b4");
                        a_button.style.color="#f0c";
			fun_draw_edge(inside_nodes[0],inside_nodes[1]);
			adjacent[inside_nodes[0]].push(inside_nodes[1]);
			adjacent[inside_nodes[1]].push(inside_nodes[0]);
			inside_nodes = [];
                        a_canvas.removeEventListener("click",add_edge,false);
		}
		var end_drawing = function () {
			a_button = document.getElementById("b5");
                        a_button.style.color="blue";
			a_canvas.removeEventListener("click",add_node,false);
			a_canvas.removeEventListener("click",add_edge,false);
			var j = 0;
			var y = '[';
			while(j < x_cor.length) {
				if(j == ((x_cor.length) - 1)) {
					y = y + '[' + adjacent[j] + ']' ;
					break;
				}
				y = y + '[' + adjacent[j] + ' ] '+ ',';
				j = j+ 1;
			}
			y = y + ']';
			$(document).ready(function() {
			   $.post("/posted", {name : y}, function(data){ 
							 var res_colors = data;
			   for(i = 0;i < res_colors.length;i += 1) {
					a_context.beginPath();
		 	                a_context.arc(x_cor[i],y_cor[i],10,0,Math.PI * 2,true);
                                        a_context.fillStyle = color[res_colors[i]]
                                        a_context.fill();
					}
			   },"json");
			});
		}

		var instructions = function() {
			a_button = document.getElementById("b6");
                        a_button.style.color="white";
			alert("------------------------------------Instructions to Draw---------------------------------------\n|\n| Step 1:    Click the 'Start Draw Node' button to begin drawing nodes.\n| Step 2:    Click the 'End Node' button to end drawing nodes.\n| Step 3:    Click the 'Add Edge' button and then click inside two nodes.\n| Step 4:    Click 'Draw Edge' button to draw the edge between the nodes.\n| Step 5:    Click the 'Colour it !!' button to see the coloured graph.\n|\n| ------------------------------------------------Notes-------------------------------------------\n|\n| -> After drawing one edge if you want to draw another repeat steps 3 and 4.\n| -> After drawing the edges if you like to draw nodes click 'Start Draw Node'\n|      button and continue. \n|\n| -------------------------------------------Warning!!!-------------------------------------------\n|\n| -> By making mistakes the grah is n't look like you are expected.\n|      I am not responsible for such things...\n-----------------------------------------------------------------------------------------------------\n");
		} 
				

