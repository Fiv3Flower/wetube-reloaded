import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({})
    return res.render("home", {pageTitle: "Home", videos});
};
export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id) //여기서 부터 다시 시작
    return res.render("watch", {pageTitle: `Watching`, video});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle: `Editing`}); 
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
}

// Test forms
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
    await Video.create({
        title: title,
        description: description,
        hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
    } catch(error) {
        return res.render("upload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message
        });
    }
}