;

class Plane extends Shape
{
	constructor(divisions_in_x, divisions_in_y)
	{
		super(true);
		this.divisions_in_x = divisions_in_x;
		this.divisions_in_y = divisions_in_y;
		this.type = "Plane";
		this.RIGHT = 1;
		this.DOWN = this.divisions_in_x + 1;
		this.DOWN_LEFT = this.divisions_in_x + 0;
		this.LEFT = -1;
		this.UP	= -this.DOWN;
		this.UP_RIGHT = -this.DOWN_LEFT;
	}

	Initialize()
	{
		this.CreateBuffers();

		var deltaX =  2.0 / this.divisions_in_x;
		var deltaY = -2.0 / this.divisions_in_y;
		var v = [-1.0 , 1.0 , 0.0];
		var nv = [];
		var n_offset = vec3.create();
		vec3.scale(n_offset, [0, 0, 1], 0.15);

		for (var y = 0; y < this.divisions_in_y + 1; y++)
		{
			for (var x = 0; x < this.divisions_in_x + 1; x++)
			{
				// Sometimes it is useful to push the first coordinate out of its regular position
				// so that orientation of the plane can be discerned visually. When the following are
				// uncommented, the first vertex is handled differently to permit this.
				//if (y == 0 && x == 0)
				//	this->data.vertices.push_back(vec3(-2.0f, v.y, v.z));
				//else
				PushVertex(this.triangle_vrts, v);
				PushVertex(this.texture_coords, [v[0] / 2.0 + 0.5, v[1] / 2.0 + 0.5]);
				PushVertex(this.normal_vrts, z_axis);
				nv = this.triangle_vrts.slice(this.triangle_vrts.length - 3);
				PushVertex(this.normal_display_vrts, nv);
				vec3.add(nv, nv, n_offset);
				PushVertex(this.normal_display_vrts, nv);
				v[0] = v[0] + deltaX;
			}
			v[0] = -1.0;
			v[1] = v[1] + deltaY;
		}

		var i = 0;
		var w = this.divisions_in_x + 1;

		for (var y = 0; y < this.divisions_in_y; y++)
		{
			for (var x = 0; x < this.divisions_in_x; x++)
			{
				// "Top" Triangle - This associates this vertex with the one to its right with the one
				// beneath the current vertex. The order defines a clockwise winding.
				this.indicies.push(i);
				this.indicies.push(i + 1);
				this.indicies.push(i + w);
				this.line_segment_indicies.push(i, i + 1, i + 1, i + w, i + w, i);

				// Bottom triangle - This associates the vertex to our right with the one below it and
				// the one below the current vertex. This order defines a clockwise winding.
				this.indicies.push(i + 1);
				this.indicies.push(i + w + 1);
				this.indicies.push(i + w);
				this.line_segment_indicies.push(i + 1, i + w + 1);
				this.line_segment_indicies.push(i + w + 1, i + w);
				this.line_segment_indicies.push(i + w, i + 1);
				i++;
			}
			i++;
		}
		this.BindBuffers();
	}

	ContributeToNormal(i, row, col, sd, offset_1, offset_2)
	{
		var s = vec3.create();
		var i0 = i * 3;
		var i1 = (i + offset_1) * 3;
		var i2 = (i + offset_2) * 3;
		var v = this.triangle_vrts.slice(i0, i0 + 3);
		var a = this.triangle_vrts.slice(i1, i1 + 3);
		var b = this.triangle_vrts.slice(i2, i2 + 3);
		vec3.sub(a, v, a);
		vec3.sub(b, v, b);
		vec3.normalize(a, a);
		vec3.normalize(b, b);
		vec3.cross(s, a, b);
		vec3.add(sd.sum, sd.sum, s);
		sd.divisor++;
	}

	/* sd is an object 
	*/
	SE(i, row , col , sd)
	{
		if (row == this.divisions_in_y || col == this.divisions_in_x)
			return;

		this.ContributeToNormal(i, row, col, sd, this.RIGHT, this.DOWN);
	}

	SSW(i, row , col , sd)
	{
		if (row == this.divisions_in_y || col == 0)
			return;
		this.ContributeToNormal(i, row, col, sd, this.DOWN, this.DOWN_LEFT);
	}

	WSW(i, row , col , sd)
	{
		if (row == this.divisions_in_y || col == 0)
			return;

		this.ContributeToNormal(i, row, col, sd, this.DOWN_LEFT, this.LEFT);
	}

	NW(i, row , col , sd)
	{
		if (row == 0 || col == 0)
			return;

		this.ContributeToNormal(i, row, col, sd, this.LEFT, this.UP);
	}

	NNE(i, row , col , sd)
	{
		if (row == 0 || col == this.divisions_in_x)
			return;

		this.ContributeToNormal(i, row, col, sd, this.UP, this.UP_RIGHT);
	}

	ENE(i, row , col , sd)
	{
		if (row == 0 || col == this.divisions_in_x)
			return;

		this.ContributeToNormal(i, row, col, sd, this.UP_RIGHT, this.RIGHT);
	}

	RecomputeNormals()
	{
		var i = 0;
		var w = this.divisions_in_x + 1;

		//vector<vec3> & p = data.normal_visualization_coordinates;

		// int i indexes the consecutive vertex indices. The row and col values are useful
		// to maintain a logical picture of the vertex index i represents. The approach here
		// is to examine every triangle in which vertex i participates. Average together all
		// the cross products (after normalizing both the input and the output) taken in 
		// clockwise order. We later determined that it should have been counter clockwise
		// order. Rather than changing all the calls to cross(), I negated the assignments
		// to data.normals (abbreviated by n).
		for (var row = 0; row <= this.divisions_in_y; row++)
		{
			for (var col = 0; col < w; col++, i++)
			{
				var sd = { sum : vec3.create(), divisor : 0 };
				this.SE (i , row , col , sd);
				this.SSW(i , row , col , sd);
				this.WSW(i , row , col , sd);
				this.NW (i , row , col , sd);
				this.NNE(i , row , col , sd);
				this.ENE(i , row , col , sd);

				vec3.negate(sd.sum, sd.sum);
				vec3.scale(sd.sum, sd.sum, 1.0 / sd.divisor);
				vec3.normalize(sd.sum, sd.sum);
				this.normal_vrts.splice(i * 3, 3, sd.sum[0], sd.sum[1], sd.sum[2]);

				// As we leave processing of the current vertex, we take the opportunity to
				// update the visualization vectors. The beginning of each visualization vector
				// is the position of the vertex itself. The other end of each visualization 
				// vector is the newly calculated normal modulated by a constant divisor added
				// to the position of the vertex.
				//debugger;
				var p = this.triangle_vrts.slice(i * 3, i * 3 + 3);
				var n = this.normal_vrts.slice(i * 3, i * 3 + 3);
				vec3.scale(n, n, 0.15);
				vec3.add(n, p, n);
				this.normal_display_vrts.splice(i * 3 * 2, 3, p[0], p[1], p[2]);
				this.normal_display_vrts.splice(i * 3 * 2 + 3, 3, n[0], n[1], n[2]);
				//p[i * 2 + 1] = v[i] + n[i] / NORMAL_LENGTH_DIVISOR;
			}
		}
	}
}

class DiscConeCylinder extends Plane
{
	/**
	* Construct a Disc or a Cone or a Cylinder (from a Plane).
	* @param {int}		What will become slices
	* @param {int} 		What will become stacks
	* @param {number}	Front radius
	* @param {number}	Back radius
	* @param {vec3}		Front center
	* @param {vec3}		Back center
	* @param {number}	Start at angle in degrees
	* @param {number}	Ending angle in degrees
	* @return {none}
	*/
	constructor(divisions_in_x, divisions_in_y, fr, br, fc, bc, beginning_theta, ending_theta)
	{
		if (beginning_theta == undefined)
			beginning_theta = 0;

		if (ending_theta == undefined)
			ending_theta = 360;

		if (ending_theta < beginning_theta)
		{
			var t = ending_theta;
			ending_theta = beginning_theta;
			beginning_theta = t;
		}

	//	if (ending_theta - beginning_theta >= 360)
	//		ending_theta -= 0.0001;

		var partial_sweep = (beginning_theta != ((ending_theta + 360) % 360));
		var slices = divisions_in_x;
		var stacks = divisions_in_y;

		super(slices, stacks);

		this.slices = slices;
		this.stacks = stacks;
		this.partial_sweep = partial_sweep;
		this.sweep = ending_theta - beginning_theta;
		this.type = "DCC";
		this.front_radius = fr;
		this.back_radius = br;
		this.front_center = fc;
		this.back_center = bc;
		this.beginning_theta = beginning_theta;
		this.ending_theta = ending_theta;

		var min_radius = 0.001;
		if (this.front_radius < min_radius)
			this.front_radius = min_radius;
		if (this.back_radius < min_radius)
			this.back_radius = min_radius;
	}

	Initialize()
	{
		super.Initialize();

		var incremental_theta = this.sweep / this.slices;
		var incremental_back_to_front = 1.0 / (this.stacks);
		var back_to_front = 0;
		var center = vec3.create();
		var p = vec3.create();

		this.beginning_theta = Radians(this.beginning_theta);
		this.ending_theta = Radians(this.ending_theta);
		incremental_theta = Radians(incremental_theta);

		var vertex_counter = 0;
		for (var stk = 0; stk < this.stacks + 1; stk++)
		{
			var u = stk / this.stacks;
			var x = [LERP(this.back_radius, this.front_radius, back_to_front), 0, 0];
			vec3.lerp(center, this.back_center, this.front_center, back_to_front);
			var r = mat4.create();

			mat4.rotate(r, r, this.beginning_theta, z_axis);
			for (var slc = 0; slc <= this.slices; slc++)
			{
				var v = slc / this.slices;
				vec3.transformMat4(p, x, r);
				vec3.add(p, p, center);
				this.triangle_vrts.splice(vertex_counter * 3, 3, p[0], p[1], p[2]);
				mat4.rotate(r, r, incremental_theta, z_axis);
				vertex_counter++;
			}
			back_to_front += incremental_back_to_front;
		}
		this.RecomputeNormals();
		this.BindBuffers();
	}

	RecomputeNormals()
	{
		super.RecomputeNormals();
		if (!this.partial_sweep)
		{
			var w = this.slices + 1;
			for (var ring_index = 0; ring_index < this.stacks + 1; ring_index++)
			{
				var a_base = (ring_index * w + 0) * 3;
				var b_base = (ring_index * w + this.slices) * 3;
				var a = this.normal_vrts.slice(a_base, a_base + 3);
				var b = this.normal_vrts.slice(b_base, b_base + 3);
				vec3.add(a, a, b);
				vec3.scale(a, a, 0.5);
				// a contains the new normal
				this.normal_vrts.splice(a_base, 3, a[0], a[1], a[2]);
				this.normal_vrts.splice(b_base, 3, a[0], a[1], a[2]);
				// scale the new normal then add it the position of the original base point
				vec3.scale(a, a, 0.15);
				vec3.add(a, a, this.normal_display_vrts.slice(a_base * 2, a_base * 2 + 3));
				// Update the far end point
				this.normal_display_vrts.splice(a_base * 2 + 3, 3, a[0], a[1], a[2]);
				this.normal_display_vrts.splice(b_base * 2 + 3, 3, a[0], a[1], a[2]);
			}
		}
	}
}

class WrappedSphere extends Plane
{
	constructor(slices, stacks, beginning_theta, ending_theta)
	{
		super(slices, stacks)

		if (beginning_theta == undefined)
			beginning_theta = 0;

		if (ending_theta == undefined)
			ending_theta = 360;

		if (ending_theta < beginning_theta)
		{
			var t = ending_theta;
			ending_theta = beginning_theta;
			beginning_theta = t;
		}

		this.type = "WS";
		this.slices = slices;
		this.stacks = stacks;
		this.beginning_theta = beginning_theta;
		this.ending_theta = ending_theta;

		this.slices = slices;
		this.stacks = stacks;
		this.partial_sweep = (beginning_theta != ((ending_theta + 360) % 360));
		this.sweep = ending_theta - beginning_theta;
	}

	Initialize()
	{
		super.Initialize();

		var R = 1/(this.stacks);
		var S = 1/(this.slices);
		var r, s;

		var vertex_counter = 0;
		var PI_2 = Math.PI / 2;
		
		for(r = 0; r <= this.stacks; r++)
		{
			for(s = 0; s <= this.slices; s++) {
				var y = Math.sin(-PI_2 + Math.PI * r * R );
				var x = Math.cos(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R );
				var z = Math.sin(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R );

				var offset = vertex_counter * 2;
				this.texture_coords[offset + 0] = 1 - this.texture_coords[offset + 0];
				//this.texture_coords[offset + 1] = r * R;

				offset = vertex_counter * 3;
				this.triangle_vrts[offset + 0] = x;
				this.triangle_vrts[offset + 1] = y;
				this.triangle_vrts[offset + 2] = z;
				vertex_counter++;
			}
		}
		this.RecomputeNormals();
		this.BindBuffers();
	}

	RecomputeNormals()
	{
		super.RecomputeNormals();
		if (!this.partial_sweep)
		{
			// This is just doing the seam
			var w = this.slices + 1;
			for (var ring_index = 0; ring_index <= this.stacks; ring_index++)
			{
				var a_base = (ring_index * w + 0) * 3;
				var b_base = (ring_index * w + this.slices) * 3;
				var a = this.normal_vrts.slice(a_base, a_base + 3);
				var b = this.normal_vrts.slice(b_base, b_base + 3);
				vec3.add(a, a, b);
				vec3.scale(a, a, 0.5);
				// a contains the new normal
				this.normal_vrts.splice(a_base, 3, a[0], a[1], a[2]);
				this.normal_vrts.splice(b_base, 3, a[0], a[1], a[2]);
				// scale the new normal then add it the position of the original base point
				vec3.scale(a, a, 0.15);
				vec3.add(a, a, this.normal_display_vrts.slice(a_base * 2, a_base * 2 + 3));
				// Update the far end point
				this.normal_display_vrts.splice(a_base * 2 + 3, 3, a[0], a[1], a[2]);
				this.normal_display_vrts.splice(b_base * 2 + 3, 3, a[0], a[1], a[2]);
			}
			// Now fix the pole normals
			for (var vertex_index = 0; vertex_index <= this.slices; vertex_index++)
			{
				var north_base = vertex_index * 3;
				var south_base = (vertex_index + (this.slices + 1) * (this.stacks)) * 3;
				this.normal_vrts.splice(north_base, 3, 0, -1, 0);
				this.normal_vrts.splice(south_base, 3, 0, 1, 0);
				this.normal_display_vrts.splice(north_base * 2 + 3, 3, 0, -1.15, 0);
				this.normal_display_vrts.splice(south_base * 2 + 3, 3, 0,  1.15, 0);
			}
		}
	}

		
}

class SealedConeCylinder
{
	constructor(divisions_in_x, divisions_in_y, fr, br, fc, bc, beginning_theta, ending_theta, front_z_offset, back_z_offset)
	{
		this.cylinder = new DiscConeCylinder(divisions_in_x, divisions_in_y, fr, br, fc, bc, beginning_theta, ending_theta);
		this.cylinder.Initialize();

		var temp = vec3.clone(fc);
		temp[2] += front_z_offset;
		this.front = new DiscConeCylinder(divisions_in_x, divisions_in_y, 0, fr, temp, fc, beginning_theta, ending_theta);
		this.front.Initialize();

		temp = vec3.clone(bc);
		temp[2] += back_z_offset;
		this.back = new DiscConeCylinder(divisions_in_x, divisions_in_y, br, 0, bc, temp, beginning_theta, ending_theta);
		this.back.Initialize();
	}

	Draw(face_shader, line_shader, mv, prj, nm, light_position, 
		draw_normals, draw_wireframe, show_triangles, material, 
		parameter, t1, t2)
	{
		this.cylinder.Draw(face_shader, line_shader, mv, prj, nm, light_position, 
		draw_normals, draw_wireframe, show_triangles, material, 
		parameter, t1, t2);

		this.front.Draw(face_shader, line_shader, mv, prj, nm, light_position, 
		draw_normals, draw_wireframe, show_triangles, material, 
		parameter, null, null);
		this.back.Draw(face_shader, line_shader, mv, prj, nm, light_position, 
		draw_normals, draw_wireframe, show_triangles, material, 
		parameter, null, null);
	}
}
