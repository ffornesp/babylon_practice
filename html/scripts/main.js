const canvasData = {
    width: 720,
    height: 480,
    backgroundColor: "#000000",
};

const canvasContainer = document.getElementById("main");
const canvas = document.createElement("canvas");
canvas.width = canvasData.width;
canvas.height = canvasData.height;
canvas.style.backgroundColor = canvasData.backgroundColor;
canvasContainer.appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {

//  PHYSICS
//    const   hk = new BABYLON.HavokPlugin(true, havokInstance);
//    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);

//  CAMERA
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", 
        new BABYLON.Vector3(0, 10, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.rotation.y = 0;
    console.log("Camera rotation: " + camera.rotation);
    //camera.rotation = new BABYLON.Vector3(0, 0, 0);
    //camera.attachControl(canvas, true);   //Comment this to disable camera control

//  LIGHTS    
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

//  MESHES
    const   paddleSize = 0.5
    const   paddleHeight = 0.5;
    const   paddleWidth = 2;

    let left_paddle = BABYLON.MeshBuilder.CreateBox("box", 
        {size: paddleSize, height: paddleHeight, width: paddleWidth}, scene);

    left_paddle.position = new BABYLON.Vector3(-6, 0, 0);
    left_paddle.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

    let right_paddle = BABYLON.MeshBuilder.CreateBox("box",
        {size: paddleSize, height: paddleHeight, width: paddleWidth}, scene);
    right_paddle.position = new BABYLON.Vector3(6, 0, 0);
    right_paddle.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

    let ball = BABYLON.MeshBuilder.CreateSphere("ball",
        {diameter: 1}, scene);
    ball.position = new BABYLON.Vector3(0, 0, 0);

    const ballVelocity = new BABYLON.Vector3(0.1, 0, 0.1);

    // Movement speeds for paddles
    const paddleSpeed = 0.1;
    let leftPaddleUp = 0;
    let leftPaddleDown = 0;
    let rightPaddleUp = 0;
    let rightPaddleDown = 0;


    // Keyboard controls
    window.addEventListener("keydown", (e) => {
        if (e.key === "w") {
            leftPaddleUp = 1;  // Move left paddle up
        }
        if (e.key === "s") {
            leftPaddleDown = 1;  // Move left paddle down
        }
        if (e.key === "ArrowUp") {
            rightPaddleUp = 1;  // Move right paddle up
        }
        if (e.key === "ArrowDown") {
            rightPaddleDown = 1;  // Move right paddle down
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "w") {
            leftPaddleUp = 0;  // Move left paddle up
        }
        if (e.key === "s") {
            leftPaddleDown = 0;  // Move left paddle down
        }
        if (e.key === "ArrowUp") {
            rightPaddleUp = 0;  // Move right paddle up
        }
        if (e.key === "ArrowDown") {
            rightPaddleDown = 0;  // Move right paddle down
        }
    });

    scene.registerBeforeRender(() => {
        let leftPaddleMovement = leftPaddleUp - leftPaddleDown;
        let rightPaddleMovement = rightPaddleUp - rightPaddleDown;

        left_paddle.position.z += leftPaddleMovement * paddleSpeed;
        right_paddle.position.z += rightPaddleMovement * paddleSpeed;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () { 
        scene.render();
});

window.addEventListener("resize", function () {
        engine.resize();
});