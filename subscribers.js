var yaw_global;
var yaw_local;
var z_global;

// function subscribeRosout(){
//         //// Subscribe to /rosout
//         var listener = new ROSLIB.Topic({
//             ros : ros,
//             name : '/rosout_agg',
//             messageType : 'rosgraph_msgs/Log'
//         });
        
//         // subscriber callback
//         listener.subscribe(function(msg){
//             // switch(msg.name){
//             //     case '/imu':
//             //         var myConsole = document.getElementById("console-display");
//             //         var para = document.createElement("p");
//             //         //var node = document.createTextNode("This is new.");
//             //         //para.appendChild(node); 
//             //         para.style.cssText = 'margin-bottom: 0px;';
//             //         para.className = 'bg-warning';
//             //         para.textContent = '> ' + msg.name + ": " + msg.msg;
//             //         myConsole.appendChild(para);
//             //         break;
//             //     default : 
//             //         console.log(msg.name + ": " + msg.msg);
//             //         break;
//             // }
//             var CLASS_NAME;
//             switch(msg.level){
//                 case 2: // info
//                     CLASS_NAME = "";
//                     break;
//                 case 4: // warning
//                     CLASS_NAME = "bg-warning";
//                     break;
//                 case 8: //error
//                 case 16: // fatal
//                     CLASS_NAME = "bg-danger";
//                     break;
//             }
//             var myConsole = document.getElementById("console-display");
//             var para = document.createElement("p");
//             para.textContent = 'seq ' + msg.header.seq + ' > ' +   msg.name + ": " + msg.msg;
//             para.style.cssText = 'margin-bottom: 0px;';
//             para.className = CLASS_NAME + " px-1";
//             //myConsole.appendChild(para);
//             myConsole.insertBefore(para, myConsole.childNodes[0] );

//             if (msg.name == '/recorder' || msg.name ==  '/my_record_bag'){
//                 var myConsoleRecord = document.getElementById("console-record");

//                 myConsoleRecord.insertBefore(para, myConsoleRecord.childNodes[0] );
//             }

//             // console.log(msg);
//         });
// }



function subscribeZEDPoseInfo(){
    var listener = new ROSLIB.Topic({
        ros : ros,
        name : '/zed/pose',
        messageType : 'geometry_msgs/PoseStamped'
    });

    listener.subscribe(function(msg){
        document.getElementById("x_zed").innerHTML = msg.pose.position.x.toFixed(2);
        document.getElementById("y_zed").innerHTML = msg.pose.position.y.toFixed(2);
        document.getElementById("z_zed").innerHTML = msg.pose.position.z.toFixed(2);
        
        var q = msg.pose.orientation;
        var yaw = - Math.atan2(2.0*(q.x*q.y + q.w*q.z), (q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z))/Math.PI*180;
        // var yaw = Math.asin(-2.0*(q.x*q.z - q.w*q.y))/Math.PI*180;
        // var yaw = Math.atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z)/Math.PI*180;
        document.getElementById("yaw_zed").innerHTML = yaw.toFixed(0);
        var yaw_local = yaw.toFixed(0);
        // atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z);
    });
}

function subscribeUAVPoseInfo(){
    var listener = new ROSLIB.Topic({
        ros : ros,
        name : '/mavros/position/local_nwu/sys_id_6',
        messageType : 'geometry_msgs/PoseStamped'
    });

    listener.subscribe(function(msg){
        document.getElementById("x").innerHTML = msg.pose.position.x.toFixed(2);
        document.getElementById("y").innerHTML = msg.pose.position.y.toFixed(2);
        document.getElementById("z").innerHTML = msg.pose.position.z.toFixed(2);
        z_global = msg.pose.position.z.toFixed(2);
        var q = msg.pose.orientation;
        var yaw = - Math.atan2(2.0*(q.x*q.y + q.w*q.z), (q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z))/Math.PI*180;
        // var yaw = Math.asin(-2.0*(q.x*q.z - q.w*q.y))/Math.PI*180;
        // var yaw = Math.atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z)/Math.PI*180;
        document.getElementById("yaw").innerHTML = yaw.toFixed(0);
        // atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z);
    });
}

function subscribeGlobalPoseInfo(){
    var listener = new ROSLIB.Topic({
        ros : ros,
        name : '/ekf_fusion/pose',
        messageType : 'geometry_msgs/PoseWithCovarianceStamped'
    });

    listener.subscribe(function(msg){
        document.getElementById("x_g").innerHTML = msg.pose.pose.position.x.toFixed(2);
        document.getElementById("y_g").innerHTML = msg.pose.pose.position.y.toFixed(2);
        document.getElementById("z_g").innerHTML = z_global;
        
        var q = msg.pose.pose.orientation;
        var yaw = - Math.atan2(2.0*(q.x*q.y + q.w*q.z), (q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z))/Math.PI*180;
        // var yaw = Math.asin(-2.0*(q.x*q.z - q.w*q.y))/Math.PI*180;
        // var yaw = Math.atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z)/Math.PI*180;
        document.getElementById("yaw_g").innerHTML = yaw.toFixed(0);
        // atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z);
    });
}

