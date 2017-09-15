const playlistRoutes = require("./playlists");

const constructorMethod = (app) => {
    app.use("/playlists", playlistRoutes);

    app.get("/", (req, res) => {
        res.render("home", {});
    });
    
    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = constructorMethod;