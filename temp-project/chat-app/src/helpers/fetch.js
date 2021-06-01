const baseURL = process.env.REACT_APP_API_URL;

export const noTokenFetch = async (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
  console.log(baseURL);
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
