﻿module egret3d {
    export class Class_Particle extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

        private cube: Mesh; 
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var planemat: TextureMaterial = new TextureMaterial();
            var loadtex1: URLLoader = new URLLoader("resource/floor/brick-diffuse.jpg");
            loadtex1.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex1["mat"] = planemat;
            //this.view1.addChild3D(new Mesh(new PlaneGeometry(1000, 1000), planemat));

            this.cube = new Mesh( new CubeGeometry(10,10,10) , null );
            this.view1.addChild3D(this.cube);

            var mat: TextureMaterial = new TextureMaterial();
            this.particle = new ParticleEmitter(null, mat, 1000 );
            this.particle.play();

            this.view1.addChild3D(this.particle);
           
            this.particle.followTarget = this.cube ;

            var loadtex: URLLoader = new URLLoader("resource/effect/line_0025.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;

            var vv: HTMLInputElement = <HTMLInputElement>document.getElementById("rest");
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
        }

        protected obj: Object3D;
        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0; 
        public update(e: Event3D) {
            this.cameraCrl.update();
            //this.obj.rotationY++;
            this.angle += 0.01;
            this.cube.x = Math.cos(this.angle) * 300;
            this.cube.z = Math.sin(this.angle) * 300;

        }

    }
} 