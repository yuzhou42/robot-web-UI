# D-Drone UI package

# Set up
## Dependencies
1. rospackages
  - web_video_server
    ```
    sudo apt-get install ros-kinetic-web-video-server
    It launches the server for streaming ROS image messages as video through the web.
    ```
  - rosbridge_server
    ```
    $ sudo apt-get install ros-kinetic-rosbridge-suite
    It launches the web sockets to allow web apps to publish or subscribe ROS messages.
    $ rosdep update
    $ rosdep install rosbridge_server
    $ rosdep install web_video_server
    ``` 
   - tf2-web-republisher
    Get from github

2. libraries 
   Download them and then add to your local repo. It could be tricky as the js script has many versions and may not work very well on your projects. Need to try them out and choose the working one.

## Usage
```
$ roslaunch tf2_web_republisher rosweb.launch

```


## Tutorials 
1. [Bootstrap 4 + ROS](https://medium.com/husarion-blog/bootstrap-4-ros-creating-a-web-ui-for-your-robot-9a77a8e373f9)
2. [Bootstrap 4 Tutorial](https://www.w3schools.com/bootstrap4/default.asp)
3. [ROBOTWEBTOOLS](http://robotwebtools.org/tools.html)
4. [Theme](https://bootswatch.com/)
 

# MISC
## Tested relative packages 
- [ros-rviz](https://github.com/jstnhuang/ros-rviz/wiki/User-guide)
  Doesn't have enough fuction, and my laptap went crazy when runing it.
## Keng
- Remove compression option(line 54547 and line 54570) in ros3d.js!!!!!!!!
- Set minimum heght in case of overlapping

# Log
## Finished
- show image
- show rviz
- send engine0 command (no set home)
- send engage command
- show uav status
- waypoints selection from the image map
- Finished UI design

## To do
- add send funtion
- rewrite task manager
