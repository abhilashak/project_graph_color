def find_color(adj,node_colors):
	return node_colors [adj]
	
def check_colored(adj,check_list):
	return check_list [adj]

def give_color(node,adj_list,check_list,node_colors):
	adj_nodes_colors = []
	avail_colors = [0,1,2,3,4,5,6,7,8,9]
	for adj in adj_list [node]:
		if(check_colored(adj,check_list)):
			used_color = find_color(adj,node_colors)
			adj_nodes_colors.append(used_color) 
	avail_color_set = set(avail_colors)
	colored_set = set(adj_nodes_colors)
	ok_colors = avail_color_set - colored_set
	ok_colors_list = list(ok_colors)
	
	return ok_colors_list [0]

def graph_coloring(adj_list):
	nodes = range(len(adj_list))
	check_list = []
	i = 0
	while(i < len(adj_list)) :
		check_list.append(0) 
		i += 1
	colors = {
		0 : "red",
		1 : "blue",
		2 : "green",
		3 : "yellow",
		4 : "orange",
		5 : "white",
		6 : "black",
		7 : "brown",
		8 : "violet",
		9 : "pink"
	}
	node_colors = {
	}
	for node in nodes:
		node_colors [node] = give_color(node,adj_list,check_list,node_colors)
		check_list [node] = 1	
	value_color = node_colors.values()
	return value_color
	



