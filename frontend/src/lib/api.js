import axios from 'axios';

const SERVER_DOMAIN = 'http://localhost:5000';

export async function getAllQuotes() {
  var data = null;
  try {
    const response = await axios.get(`${SERVER_DOMAIN}/quotes`);
    data = response.data;
  } catch (e) {
    throw new Error(e.message || 'Could not fetch quotes.');
  }

  return data;
}

export async function getSingleQuote(quoteId) {
  var data = null;

  try {
    const response = await axios.get(`${SERVER_DOMAIN}/quotes/${quoteId}`);
    data = response.data;
  } catch (e) {
      throw new Error(e.message || 'Could not fetch quote.');
  }

  return data;
}

export async function addQuote(quoteData) {
  try {
    axios.post(`${SERVER_DOMAIN}/quotes`, quoteData);
  } catch (e) {
    throw new Error(e.message || 'Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {
  var data = null;

  try {
    const response = await axios.post(`${SERVER_DOMAIN}/quotes/${requestData.quoteId}/comments`, requestData.commentData);
    data = response.data;
  } catch (e) {
    throw new Error(e.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  var data = null;
  try {
    const response = await axios.get(`${SERVER_DOMAIN}/quotes/${quoteId}/comments`);
    data = response.data;
  } catch (e) {
    throw new Error(e.message || 'Could not add comment.');
  }

  return data;
}
