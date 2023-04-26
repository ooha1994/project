export const validateUser = async () => {
  fetch("http://localhost:9095/simplybook/user/{username}", {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      setError("Something went wrong, please try again later.");
    });
};

export async function createUser(data) {
  const response = await fetch(`/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: data }),
  });
  return await response.json();
}
