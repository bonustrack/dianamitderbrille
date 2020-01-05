class Client {
  public accessToken?: string = '';

  request(command, params?) {
    const url = `${process.env.VUE_APP_REST_API}/api/${command}`;
    let init;
    if (params) {
      init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.accessToken
        },
        body: JSON.stringify(params)
      };
    }
    return fetch(url, init).then(res => res.json());
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }
}

const client = new Client();

export default client;
