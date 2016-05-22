import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
	url: {type: 'String', required: true},
	hash: {type: 'String', required: true},
	cuid: {type: 'String', required: true},
	dateAdded: {type: 'Date', default: Date.now, required: true},
});

export default mongoose.model('Url', postSchema);
