import delay from '../../utils/delay';

class HttpCLient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);

    await delay(500);

    return response.json();
  }
}

export default HttpCLient;
