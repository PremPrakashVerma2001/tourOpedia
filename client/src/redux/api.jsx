//this api module will handle all the api calling to backend and returning the response:
// const sbu = "http://localhost:3000"; //serverBaseURL
const sbu = import.meta.env.VITE_SERVER_BASE_URL;
console.log(sbu);

const getOptions = (method, body = null) => {
  const profile = localStorage.getItem("profile");
  let token;
  if (profile) {
    token = JSON.parse(profile)["token"];
  }
  // console.log(token);
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token ? `Bearer ${token}` : null,
    },
    body: body && `${body}`,
  };

  return options;
};

//--------------------------------------handling user auth api---------------------------------//
export const login = async (formData) => {
  const res = await fetch(
    `${sbu}/auth/login`,
    getOptions("POST", JSON.stringify(formData))
  );

  const data = await res.json();
  return data;
};

export const signup = async (formData) => {
  const res = await fetch(
    `${sbu}/auth/signup`,
    getOptions("POST", JSON.stringify(formData))
  );
  const data = await res.json();
  return data;
};

//----------------------------------- handling Tour Resource Feature----------------------------//

//create: C
export const addTour = async (tourData) => {
  // const body = JSON.stringify(tourData);
  // console.log(tourData);

  const res = await fetch(
    `${sbu}/tour/add`,
    getOptions("POST", JSON.stringify(tourData))
  );

  const data = await res.json(); //converting json--> js object:
  return data;
};

//read : R
// export const getTour = async () => {
//   const res = await fetch(`${sbu}/tour`, getOptions("GET"));

//   const data = await res.json();
//   return data;
// };

//updating for pagination:
export const getTour = async (pageNo) => {
  const res = await fetch(`${sbu}/tour?page=${pageNo}`, getOptions("GET"));

  const data = await res.json();
  return data;
};

export const getTourById = async (id) => {
  const res = await fetch(`${sbu}/tour/${id}`, getOptions("GET"));

  const data = await res.json();
  return data;
};

export const getTourByUserId = async () => {
  const res = await fetch(`${sbu}/tour/user`, getOptions("GET"));

  const data = await res.json();
  return data;
};

//update : U

export const updateTour = async (id, tourData) => {
  const res = await fetch(
    `${sbu}/tour/${id}`,
    getOptions("PATCH", JSON.stringify(tourData))
  );

  const data = await res.json();
  return data;
};

//delete : D
export const deleteTourById = async (id) => {
  const res = await fetch(`${sbu}/tour/${id}`, getOptions("DELETE"));

  const data = await res.json();
  return data;
};

//search:

export const getTourBySearch = async (searchInput) => {
  const res = await fetch(
    `${sbu}/tour/search?title=${searchInput}`,
    getOptions("GET")
  );

  const data = await res.json();
  return data;
};

export const getTourByTag = async (tagV) => {
  const res = await fetch(`${sbu}/tour/tag/${tagV}`, getOptions("GET"));
  const data = await res.json();
  return data;
};

export const getRelatedTour = async (tags) => {
  const res = await fetch(
    `${sbu}/tour/related`,
    getOptions("POST", JSON.stringify(tags))
  );

  const data = await res.json();

  return data;
};

export const updateLike = async (likeCount, id) => {
  const res = await fetch(
    `${sbu}/tour/like`,
    getOptions("PATCH", JSON.stringify({ likeCount: likeCount, id: id }))
  );

  const data = await res.json();
  return data;
};
