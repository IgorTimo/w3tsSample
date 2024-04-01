const postAddress = async (address) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ address }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    "https://w3ts-c794d6e5e200.herokuapp.com/",
    requestOptions
  );
  
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  console.log("Response from server: : ", data);
};
export default postAddress;
