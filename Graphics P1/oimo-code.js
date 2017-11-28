var world = new OIMO.World({
    timestep: 1 / 60,//simulation time per step. Smaller #'s are "finer", e.g 1/1000
    iterations: 8,//Solvers for joints
    broadphase: 2,//2 means "sweep and prune", see docs
    worldscale: 1,//Min 0.1, Max 10; Basic "units" of distance
    random: true,
    info: false,
    gravity: [0, -9.8, 0]//Setup the forces of gravity on XYZ; -9.8 on Y simulates Earth's Gravity (when `worldscale` is 1.0)
});

(function (){
    var o_ground = world.add({
        type: 'box', // type of shape : sphere, box, cylinder 
        size: [40, 2, 50], // size of shape
        pos: [0, 0, 0], // start position in degree
        move: false, // dynamic or static
        density: 1,
        friction: 1,
        restitution: 0.9,
        belongsTo:2
    });
    attachOimoObjectToShape('ground',o_ground);
    attachMaterialToShape('ground');
})();

// (function (){
//     var y = 18;
//     for(var i = 0; i < 8; i++)
//     {
//         var test = 'test_'+i;
//         var testProj = 'testProj_'+i;
//         registerShape(testProj,[1,0,0]);
//         var test = world.add({
//             type: 'box', // type of shape : sphere, box, cylinder
//             size: [1.5, 1.5, 1.5], // size of shape
//             pos: [0, y, 0], // start position in degree
//             move: i != 0, // dynamic or static
//             density: 1,
//             friction: 1,
//             restitution: 0.9,
//             belongsTo:2
//         });
//         attachOimoObjectToShape(testProj,test);
//         attachMaterialToShape(testProj);
//         y = y - 1.75;

//         console.log(test);

//         //for (var j = 0; j < 7; j++)
//         //{
//             var testchain = world.add({
//                 type: 'jointBall',
//                 body1: test,
//                 body2: testProj,
//                 pos1: [0, 1.75, 0],
//                 pos2: [0, -1.75, 0],
//                 collision: true
//              })
//         //}
//     }   

// })();

        (function (){
            var test1 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 24, 0], // start position in degree
                move: false, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test1',test1);
            attachMaterialToShape('test1');

            var test2 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 22, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test2',test2);
            attachMaterialToShape('test2');

            var test3 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 20, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test3',test3);
            attachMaterialToShape('test3');

            var test4 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 18, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test4',test4);
            attachMaterialToShape('test4');

            var test5 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 16, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test5',test5);
            attachMaterialToShape('test5');

            var test6 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 14, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test6',test6);
            attachMaterialToShape('test6');

            var test7 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 12, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test7',test7);
            attachMaterialToShape('test7');

            var test8 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [1], // size of shape
                pos: [5, 10, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test8',test8);
            attachMaterialToShape('test8');

            var test9 = world.add({
                type: 'box', // type of shape : sphere, box, cylinder
                size: [3], // size of shape
                pos: [5, 6, 0], // start position in degree
                move: true, // dynamic or static
                density: 20,
                friction: 1,
                restitution: 0.1,
                belongsTo:2
            });
            attachOimoObjectToShape('test9',test9);
            attachMaterialToShape('test9');

        //    var test11 = world.add({
        //     type: 'box', // type of shape : sphere, box, cylinder
        //     size: [1], // size of shape
        //     pos: [5, 12, 0], // start position in degree
        //     move: true, // dynamic or static
        //     density: 20,
        //     friction: 1,
        //     restitution: 0.1,
        //     belongsTo:2
        // });
        // attachOimoObjectToShape('test11',test11);
        // attachMaterialToShape('test11');

        // var test12 = world.add({
        //     type: 'box', // type of shape : sphere, box, cylinder
        //     size: [1], // size of shape
        //     pos: [5, 11, 0], // start position in degree
        //     move: true, // dynamic or static
        //     density: 20,
        //     friction: 1,
        //     restitution: 0.1,
        //     belongsTo:2
        // });
        // attachOimoObjectToShape('test12',test12);
        // attachMaterialToShape('test12');

        // var test13 = world.add({
        //     type: 'box', // type of shape : sphere, box, cylinder
        //     size: [1], // size of shape
        //     pos: [5, 10, 0], // start position in degree
        //     move: true, // dynamic or static
        //     density: 20,
        //     friction: 1,
        //     restitution: 0.1,
        //     belongsTo:2
        // });
        // attachOimoObjectToShape('test13',test13);
        // attachMaterialToShape('test13');

        document.addEventListener('keydown',function(e){
            switch(e.keyCode){
                case 88:
                test9.linearVelocity.x = pow_slider.value * 10;
                test9.linearVelocity.y = ele_slider.value * 15;
                test9.linearVelocity.z = azi_slider.value * 18;
                break;

                case 77:
                
                break;
                
                default:
                break;
            }
        });

        var joint = world.add({
            type: 'jointBall',
            body1: test1,
            body2: test2,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        })  
        var joint = world.add({
            type: 'jointBall',
            body1: test2,
            body2: test3,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        })  
        var joint = world.add({
            type: 'jointBall',
            body1: test3,
            body2: test4,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        }) 
        var joint = world.add({
            type: 'jointBall',
            body1: test4,
            body2: test5,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        }) 
        var joint = world.add({
            type: 'jointBall',
            body1: test5,
            body2: test6,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        }) 
        var joint = world.add({
            type: 'jointBall',
            body1: test6,
            body2: test7,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        }) 
        var joint = world.add({
            type: 'jointBall',
            body1: test7,
            body2: test8,
            pos1: [0, -1, 0],
            pos2: [0, 1, 0],
            collision: true
        }) 
        var joint = world.add({
            type: 'jointBall',
            body1: test8,
            body2: test9,
            pos1: [0, -2, 0],
            pos2: [0, 2, 0],
            collision: true
        }) 

        // var joint = world.add({
        //     type: 'jointBall',
        //     body1: test10,
        //     body2: test11,
        //     pos1: [0, -0.75, 0],
        //     pos2: [0, 0.75, 0],
        //     collision: true
        //  }) 
        // var joint = world.add({
        //     type: 'jointBall',
        //     body1: test11,
        //     body2: test12,
        //     pos1: [0, -0.75, 0],
        //     pos2: [0, 0.75, 0],
        //     collision: true
        // })  
        // var joint = world.add({
        //     type: 'jointBall',
        //     body1: test12,
        //     body2: test13,
        //     pos1: [0, -0.75, 0],
        //     pos2: [0, 0.75, 0],
        //     collision: true
        // }) 

 })();

(function (){
    var pos = [-10,15,0];
    var src = world.add({
        type: 'box', // type of shape : sphere, box, cylinder 
        size: [0.5,0.5,0.5], // size of shape
        pos: pos, // start position in degree
        move: false, // dynamic or static
        density: 1,
        friction: 1,
        restitution: 0.9,
        belongsTo:1,
        collidesWith: 10
    });
    attachOimoObjectToShape('launcher_source',src,pos);
    attachMaterialToShape('launcher_source');
})();

//Call for the first frame & repeat
function OimoMain(now) {
    world.step();
    requestAnimationFrame(OimoMain);
}
requestAnimationFrame(OimoMain);

var shape_groups = {
    bricks:{
        start: -1,
        end: -1
    },
    projectiles:{
        start:-1,
        end:-1,
        next_index:-1
    },
    links:{
        start: -1,
        end: -1,
        next_index: -1
    }
}

// //Setup chain
// setup_chain(5,1.5);
// function setup_chain(link_count,link_size){
//     shape_groups["links"]["start"] = shapes.length;
//     shape_groups["links"]["next_index"] = shapes.length;
//     for(var i=0;i<link_count;i++){
//         var proj_id = 'proj_'+i;

//         registerShape(proj_id,[1,0,0]);
//         var proj_oimo = world.add({
//             type: 'box',
//             size: [link_size,link_size,link_size],
//             pos: [0, -100, 0],
//             rot:[0,0,0],
//             move: true, 
//             density: 20,
//             friction: 0.2,
//             restitution: 0.8,
//             belongsTo:1,
//             collidesWith:2
//         });
//         attachOimoObjectToShape(proj_id,proj_oimo,[0, -100, 0]);
//         attachMaterialToShape(proj_id);
//     }
//     shape_groups["links"]["end"] = shapes.length;
// }

//Setup projectiles
setup_projectiles(100,1.5);
function setup_projectiles(projectile_count,projectile_size){
    shape_groups["projectiles"]["start"] = shapes.length;
    shape_groups["projectiles"]["next_index"] = shapes.length;
    for(var i=0;i<projectile_count;i++){
        var proj_id = 'proj_'+i;

        registerShape(proj_id,[1,0,0]);
        var proj_oimo = world.add({
            type: 'box',
            size: [projectile_size,projectile_size,projectile_size],
            pos: [0, -100, 0],
            rot:[45,0,0],
            move: true, 
            density: 20,
            friction: 0.2,
            restitution: 0.8,
            belongsTo:1,
            collidesWith:2
        });
        attachOimoObjectToShape(proj_id,proj_oimo,[0, -100, 0]);
        attachMaterialToShape(proj_id);
    }
    shape_groups["projectiles"]["end"] = shapes.length;
}

function launchProjectile(){
    var proj = shapes[shape_groups["projectiles"]["next_index"]].oimo;
    proj.resetPosition(-10,15,0);
    proj.resetRotation(45,0,0);
    proj.linearVelocity.x = launcher_power;
    proj.linearVelocity.y = launcher_elevation;
    proj.linearVelocity.z = launcher_azimuth;
    shape_groups["projectiles"]["next_index"] += 1;
    if(shape_groups["projectiles"]["next_index"] >= shape_groups["projectiles"]["end"]){
        shape_groups["projectiles"]["next_index"] = shape_groups["projectiles"]["start"];
    }
}
function reset_projectiles(){
    var sgb = shape_groups["projectiles"];
    if(sgb["start"] !== -1 && sgb["end"] !== -1 ){
        for(var i=sgb["start"];i<sgb["end"];i++){//Reset all old bricks
            if(shapes[i].id.indexOf('proj') !== -1){
                var o = shapes[i]["oimo"];
                var o_pos = shapes[i]["spawn_pos"];
                o.resetRotation(0,0,0);
                o.resetPosition(o_pos[0],o_pos[1],o_pos[2]);
            }
        }
    }
}

//Setup wall for first time
setup_wall([20,1,0]);
function setup_wall(origin){
    shape_groups["bricks"]["start"] = shapes.length;
    var brick_size = 3;
    var brick_radius = brick_size/2;
    var wall_length = 15;
    var wall_height = 10;
    //Build up a wall, "centered" on the given `origin` (bottom middle)
    for(var r=0;r<wall_height;r++){
        var offset = (r+1) % 2 === 0;
        for(var c=0;c<wall_length;c++){
            if(!offset && c == 0){
                // skip the first block in every non-offset row
            } else {
                var brick_id = 'brick_'+r+'_'+c;
                
                var b_x = brick_radius,
                b_y = brick_radius,
                b_z = brick_size;
                
                if(offset && (c==0 || c == wall_length-1)){
                    b_z = brick_radius;
                }
            
                var brick_pos = [
                    origin[0]-b_x,
                    origin[1]+(r*b_y)+(b_y/2),
                    origin[2]-(wall_length*b_x)+(c*brick_size)+(offset?b_x:0)+(offset&&c==0?b_z/2:0)-(offset&&c==(wall_length-1)?b_z/2:0)
                ];
    
                registerShape(brick_id,null);
                var brick_oimo = world.add({
                    type: 'box',
                    size: [b_x,b_y,b_z],
                    pos: brick_pos,
                    move: true, 
                    density: 10,
                    friction: 0.2,
                    restitution: 0.05,
                    belongsTo:2
                });
                attachOimoObjectToShape(brick_id,brick_oimo,brick_pos);
                attachMaterialToShape(brick_id);
            }
        }
    }
    shape_groups["bricks"]["end"] = shapes.length;
}
function reset_wall(){
    var sgb = shape_groups["bricks"];
    if(sgb["start"] !== -1 && sgb["end"] !== -1 ){
        for(var i=sgb["start"];i<sgb["end"];i++){//Reset all old bricks
            if(shapes[i].id.indexOf('brick') !== -1){
                var o = shapes[i]["oimo"];
                var o_pos = shapes[i]["spawn_pos"];
                o.resetRotation(0,0,0);
                o.resetPosition(o_pos[0],o_pos[1],o_pos[2]);
            }
        }
    }
}
