import UrlModel from "../models/url";
import cuid from "cuid";
import shortid from "shortid";
import sanitizeHtml from "sanitize-html";

export function getUrls(req, res) {
  // todo not implemented yet
  // todo not implemented yet
  Url.find()
    .sort("-dateAdded")
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ posts });
    });
}

export async function addUrl(req, res) {
  if (!req.body.url.url) {
    return res.status(403).end();
  }

  const newPost = new UrlModel(req.body.url);

  // Let's sanitize inputs
  newPost.content = sanitizeHtml(newPost.url);
  newPost.hash = shortid.generate();
  newPost.cuid = cuid();

  try {
    const { ops } = await req._db.collection("urls").insertOne(newPost);

    res.json({ url: ops[0]._doc });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getUrl(req, res) {
  const hash = req.query.hash;

  try {
    const url = await req._db.collection("urls").findOne({ hash: hash });
    res.json({ post: url });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getRedirectUrl(req, hash, res) {
  //for server redirect when they poaste the link in the browser
  try {
    const url = await req._db.collection("urls").findOne({ hash: hash });

    res.redirect(url.url);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function deleteUrl(req, res) {
  const postId = req.body.postId;

  try {
    const url = await req._db.collection("urls").findById(postId);

    url.remove(() => {
      res.status(200).end();
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}
