class Client {
  public accessToken?: string = '';

  request(command, params?, options?) {
    const isUpload = !!(options && options.upload);
    return new Promise((resolve, reject) => {
      const url = `${process.env.VUE_APP_API}/api/${command}`;
      let init;
      if (isUpload) {
        init = {
          method: 'POST',
          headers: {
            Authorization: this.accessToken
          },
          body: params
        };
      } else {
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
      return fetch(url, init)
        .then(res => {
          if (!res.ok) throw res;
          return res.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          err.json().then(result => {
            reject(result.error);
          });
        });
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }
}

const client = new Client();

export default client;
