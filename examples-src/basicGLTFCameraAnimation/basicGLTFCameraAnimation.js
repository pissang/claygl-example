var app = clay.application.create('#viewport', {

    graphic: {
        // Enable shadow
        shadow: true
    },

    init: function (app) {
        // Create camera
        // this._camera = app.createCamera([1, 1, 2], [0, 0, 0]);

        // Create lights
        var light = app.createDirectionalLight([-1, -1, -1], '#fff', 0.7);
        light.shadowResolution = 2048;

        app.createAmbientCubemapLight('../assets/textures/hdr/uffizi-large.hdr', 1, 1).then(function (result) {
            var skybox = new clay.plugin.Skybox({
                scene: app.scene,
                environmentMap: result.specular.cubemap
            });
            // Use high lod to show the `rough` skybox
            skybox.material.set('lod', 3);
        });

        // Load boombox model.
        return app.loadModel('../assets/models/polly/project_polly.gltf', {
            waitTextureLoaded: true
        }).then(function (result) {
            // Use the moving camera as main camera.
            app.scene.setMainCamera(result.cameras[1]);
        });
    },

    loop: function (app) {
        // console.log(app.scene.getMainCamera().worldTransform);
    }
});