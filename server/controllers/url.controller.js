import Url from '../models/url';
import cuid from 'cuid';
import slug from 'slug';
import shortid from 'shortid';
import sanitizeHtml from 'sanitize-html';

export function getUrls(req, res) {
	console.log('req  getUrls', req);
	Url.find().sort('-dateAdded').exec((err, posts) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json({posts});
	});
}

export function addUrl(req, res) {
	if (!req.body.url.url) {
		return res.status(403).end();
	}

	const newPost = new Url(req.body.url);

	console.log('newPost ', newPost);

	// Let's sanitize inputs
	newPost.content = sanitizeHtml(newPost.url);

	newPost.hash = shortid.generate();
	newPost.cuid = cuid();
	newPost.save((err, saved) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json({url: saved});
	});
}

export function getUrl(req, res) {
	const hash = req.query.hash;

	Url.findOne({hash: hash}).exec((err, post) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json({post});
	});
}

export function getRedirectUrl(hash, res) {
	//for server redirect when they poaste the link in the browser
	Url.findOne({hash: hash}).exec((err, url) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.redirect(url.url);
	});
}

export function deleteUrl(req, res) {
	const postId = req.body.postId;
	Url.findById(postId).exec((err, post) => {
		if (err) {
			return res.status(500).send(err);
		}

		post.remove(() => {
			res.status(200).end();
		});
	});
}
