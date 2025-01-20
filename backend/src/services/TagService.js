const Tags = require('../models/TagsModel'); // Mongoose model

exports.addTag = async (tagData) => {
    const { name, count } = tagData;
    const newTag = new Tags({ name, count });
    await newTag.save();
    return newTag;
};

exports.getTags = async () => {
    const tags = await Tags.find();
    return tags
}

exports.deleteTag = async (id) => {
    const deletedTag = await Tags.findByIdAndDelete(id);
    return deletedTag;
}