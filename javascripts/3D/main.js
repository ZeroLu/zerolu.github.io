/**
 * Created by s152047 on 2015/9/19.
 */
console.log("Three js running!");
var stageCtrl = {
    setup: function(){
        var that = this;
        that.scene = new THREE.Scene();
        var zoomRatio = 150;
        var windowRatio = window.innerWidth/window.innerHeight;
        var heightConst = 1050;
        that.camera = new THREE.OrthographicCamera( heightConst*windowRatio/-zoomRatio, heightConst*windowRatio/zoomRatio, heightConst/zoomRatio, heightConst/-zoomRatio, -500, 1000 );
        //that.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000 );
        that.camera.position.x = -5;
        that.camera.position.y = 3.4;
        that.camera.position.z = -16;

        that.camera.lookAt(new THREE.Vector3(-20,4.3,-10));


        that.renderer = new THREE.WebGLRenderer();
        that.renderer.setClearColor(0xdeedff);
        that.renderer.setSize(window.innerWidth*2, window.innerHeight*2);
        that.renderer.shadowMap.enabled = true;
        that.renderer.shadowMapSoft = true;
        document.getElementById("canvas_container").appendChild(that.renderer.domElement);
        /*add OrbitControls*/
        //that.controls = new THREE.OrbitControls( that.camera, that.renderer.domElement );
        /*Render every time the perspective changed*/
        //that.controls.addEventListener( 'change', render );
        //that.controls.addEventListener( 'change', ui.debugCameraInfo );
        prevTime = Date.now();
    },
    addObjs: function(objs){
        var that = this;
        for(var i in objs){
            that.scene.add(objs[i]);
        }
    },
    animate: function(){

        if ( animation ) {
            var time = Date.now();
            animation.update( time - prevTime );
            prevTime = time;
        }
    }
};
var ui = {
    setup: function(){
        var that = this;
        that.guiControls = new function() {
            this.dirLight = true;
            this.hemiLight = true;
            this.dirLightX = 19;
            this.dirLightY = 15;
            this.dirLightZ = -18;
            this.lookAtX = 5.3;
            this.lookAtY = -0.25;
            this.lookAtZ = -16;
            this.cameraX = 36;
            this.cameraY = 3.4;
            this.cameraZ = -16;
            this.zoom = 0.4876749791155294;
            this.bgColor = "#f0f7ff";
            this.render = function () {
                render();
            };
        };
        that.stats = new Stats();
        that.stats.domElement.style.position = 'absolute';
        that.stats.domElement.style.left = '0px';
        that.stats.domElement.style.top = '0px';
        document.body.appendChild( that.stats.domElement );
        that.datGUI = new dat.GUI();
        that.controllers = [];
        that.controllers[0] = that.datGUI.add(ui.guiControls, 'dirLightX', -100, 100);
        that.controllers[1] = that.datGUI.add(ui.guiControls, 'dirLightY', -100, 100);
        that.controllers[2] = that.datGUI.add(ui.guiControls, 'dirLightZ', -100, 100);
        that.controllers[3] = that.datGUI.add(ui.guiControls, 'dirLight');
        that.controllers[4] = that.datGUI.add(ui.guiControls, 'hemiLight');
        that.controllers[5] = that.datGUI.add(ui.guiControls, 'lookAtX', -20, 20);
        that.controllers[6] = that.datGUI.add(ui.guiControls, 'lookAtY', -20, 20);
        that.controllers[7] = that.datGUI.add(ui.guiControls, 'lookAtZ', -20, 20);
        that.controllers[8] = that.datGUI.add(ui.guiControls, 'cameraX', -20, 100);
        that.controllers[9] = that.datGUI.add(ui.guiControls, 'cameraY', -20, 20);
        that.controllers[10] = that.datGUI.add(ui.guiControls, 'cameraZ', -20, 20);
        that.controllers[11] = that.datGUI.add(ui.guiControls, 'render');
        that.controllers[12] = that.datGUI.addColor(ui.guiControls, 'bgColor');
        that.controllers[13] = that.datGUI.add(ui.guiControls, 'zoom', 0, 10);
        /*Render every time the gui changed*/
        for(var i=0;i<that.controllers.length;i++){
            that.controllers[i].onChange(function(){
                that.applyChange();
                render();
            });
        }
    },
    applyChange: function () {
        var that = this;
        /*Set the change from the ui*/
        environment.lights.dirLight.position.set(that.guiControls.dirLightX,that.guiControls.dirLightY,that.guiControls.dirLightZ);
        environment.lights.hemiLight.visible = that.guiControls.hemiLight;
        environment.lights.dirLight.visible = that.guiControls.dirLight;
        //stageCtrl.camera.lookAt(new THREE.Vector3(that.guiControls.lookAtX,that.guiControls.lookAtY,that.guiControls.lookAtZ));
        stageCtrl.camera.position.x = that.guiControls.cameraX;
        stageCtrl.camera.position.y = that.guiControls.cameraY;
        stageCtrl.camera.position.z = that.guiControls.cameraZ;
        stageCtrl.renderer.setClearColor(that.guiControls.bgColor);
    },
    debugCameraInfo: function(){
        var that = this;
        console.log("camera position x: " + stageCtrl.camera.position.x + " y: " + stageCtrl.camera.position.y + " z: " + stageCtrl.camera.position.z);
        var lookAtVector = new THREE.Vector3( 0, 0, -10 ).applyQuaternion( stageCtrl.camera.quaternion ).add( stageCtrl.camera.position );
        console.log("camera lookAt x: " + lookAtVector.x + " y: " + lookAtVector.y + " z: " + lookAtVector.z);
    }
};
var assets = {
    setup: function(){
        var that = this;
        that.assetNames = ['tree'];
        that.assetNames.push('parrot', 'blue', 'little');
        that.assetNames.push('blossom-1', 'blossom-2', 'blossom-3', 'blossom-4', 'blossom-5', 'blossom-6', 'blossom-7', 'blossom-8', 'blossom-9', 'blossom-10');
        that.assetNames.push('blossom-back');
        that.assetNames.push('blossom-side1', 'blossom-side2');
        for (var index in that.assetNames){
            if(that.assetNames.hasOwnProperty(index)) {
                var loader = new THREE.JSONLoader();
                loader.load('model/'+that.assetNames[index]+'.json', addModel);
            }
        }

    }
};
var environment = {
    setup:function() {
        var that = this;
        //that.helper.setup();
        that.lights.setup();
        that.bg.setup();
    },
    bg:{
        setup: function () {
            var distance = 400000;
            // Add Sky Mesh
            sky = new THREE.Sky();
            var uniforms = sky.uniforms;
            uniforms.turbidity.value =10;
            uniforms.reileigh.value = 2;
            uniforms.luminance.value = 1;
            uniforms.mieCoefficient.value = 0.005;
            uniforms.mieDirectionalG.value = 0.8;

            // Add Sun Helper
            sunSphere = new THREE.Mesh(
                new THREE.SphereBufferGeometry( 20000, 16, 8 ),
                new THREE.MeshBasicMaterial( { color: 0xffffff } )
            );
            sunSphere.position.y = - 700000;
            sunSphere.visible = false;
            stageCtrl.addObjs( [sky.mesh,sunSphere] );
            var theta = Math.PI * ( 0.49 - 0.5 );
            var phi = 2 * Math.PI * ( 0.25 - 0.5 );
            sunSphere.position.x = distance * Math.cos( phi );
            sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
            sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
            sunSphere.visible = true;
            sky.uniforms.sunPosition.value.copy( sunSphere.position );
        }
    },
    helper:{
        setup: function () {
            var that = this;
            // Helper part
            that.axis = new THREE.AxisHelper(10);
            that.grid = new THREE.GridHelper(50, 5);
            that.gridColor = new THREE.Color("rgb(255,0,0)");
            that.grid.setColors(that.gridColor, 0x000000);
            that.cameraHelper = new THREE.CameraHelper(stageCtrl.camera);
            that.planeGeo = new THREE.PlaneGeometry(30,30,30);
            that.planeMaterial = new THREE.MeshLambertMaterial({color:0xeeeeee});
            that.plane = new THREE.Mesh(that.planeGeo,that.planeMaterial);
            that.plane.receiveShadow = true;
            that.plane.rotation.x = -.5*Math.PI;
            stageCtrl.addObjs([that.axis,that.grid,that.cameraHelper,that.plane]);
        }
    },
    lights:{
        setup: function () {
            var that = this;
            // LIGHTS
            that.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
            that.hemiLight.color.setHSL( 0.6, 1, 0.6 );
            that.hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
            that.hemiLight.position.set( 0, 500, 0 );

            that.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
            that.dirLight.color.setHSL( 0.1, 1, 0.95 );
            that.dirLight.position.set( 19, 15, -18 );
            that.dirLight.position.multiplyScalar( 50 );
            stageCtrl.addObjs([that.dirLight,that.hemiLight]);
        }
    }
};
var animation;
var prevTime;
$(function(){
    stageCtrl.setup();
    environment.setup();
    assets.setup();
    //ui.setup();
    render();
});

function render(){
    /*Render per frame*/
    //requestAnimationFrame(render);
    stageCtrl.animate();
    stageCtrl.renderer.render(stageCtrl.scene, stageCtrl.camera);
    //ui.stats.update();
}
function addModel( geometry,  materials ){
    var material;
    material= new THREE.MeshFaceMaterial(materials);
    var mesh = new THREE.Mesh( geometry, material);
    mesh.scale.set(3,3,3);
    mesh.position.set (0,0,0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    stageCtrl.scene.add( mesh );
    //animation = new THREE.MorphAnimation( mesh );
    //animation.play();
    /*After loaded, render the scene*/
    render();
}