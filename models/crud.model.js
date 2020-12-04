const { ObjectID } = require('mongodb');
const CONNECTION = require('./connection');

// const documentHandle = async ()

const createDocument = async (document, collectionName) => {
  const collection = await CONNECTION(collectionName);
  try {
    const { ops: [response] } = await collection.insertOne(document);
    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const readDocument = async (document = null, collectionName) => {
  const collection = await CONNECTION(collectionName);
  try {
    return document
      ? await collection.findOne(document)
      : await collection.find().toArray();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const updateDocument = async ({ id, ...data }, collectionName) => {
  const collection = await CONNECTION(collectionName);
  try {
    await collection.updateOne(
      { _id: ObjectID(id) },
      { $set: data },
    );
    return { id, ...data };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const deleteDocument = async ({ id }, collectionName) => {
  const collection = await CONNECTION(collectionName);
  try {
    const document = await readDocument({ id });
    if (!await collection.deleteOne({ _id: ObjectID(id) })) {
      throw new Error('Object dont exists');
    }
    return document;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
};
