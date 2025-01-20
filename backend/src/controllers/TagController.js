const tagService = require("../services/TagService");

exports.addTag = async (req, res) => {
    const newTag = await tagService.addTag(req.body);
    res.status(201).json({ success: true, newTag });
}

exports.getTags = async (req, res) => {
    const Tags = await tagService.getTags();
    res.status(200).json({ success: true, Tags });
}

exports.deleteTag = async (req, res) => {
    const tag = await tagService.deleteTag(req.params.id);
    res.status(204).json({ success: true, message: "Tag deleted successfully" })
}