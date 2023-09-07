'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		id
	} = event
	return await db.collection("homePic").doc(id).get()
};