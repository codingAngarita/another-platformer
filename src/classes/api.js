export default class Api {
  constructor() {
  }

  static async getDataRequest() {
    const url = process.env.API_URL + process.env.API_KEY + '/scores';

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  static async saveScoreRequest(name, score) {
    const url = process.env.API_URL + process.env.API_KEY + '/scores';

    const requestBody = {
      user: name,
      score
    }

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(url, requestParams);
    const data = await response.json();

    return data;
  }

  static orderData(items) {
    const compareFunc = (a, b) => {
      if(a.score > b.score) {
        return -1;
      }
      if(a.score < b.score) {
        return 1;
      }
      return 0;
    }
    return items.sort(compareFunc);
  }

  static getData() {
    const requestPromise = Api.getDataRequest();

    const sortedData = requestPromise.then( result => {
      return Api.orderData(result.result);  
    })

    return sortedData;
  }

  static saveScore(name, score) {
    const requestPromise = Api.saveScoreRequest(name, score);

    const requestSuccess = requestPromise
      .then( result => true)
      .catch( error => false);

    return requestSuccess;
  }
}