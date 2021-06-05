const baseURL = process.env.REACT_APP_API_URL;

export const noTokenFetch = async (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
  console.log(url);
  if (method === "GET") {
    const resp = await fetch(url);
    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await resp.json();
  }
};

export const tokenFetch = async (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
  console.log(url);

  const token = localStorage.getItem("token") || undefined;

  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "x-token": token,
      },
    });
    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });

    return await resp.json();
  }
};
