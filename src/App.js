import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] == "") {
      delete obj[propName];
    }
  }
  return obj
}

const postMessage = async (url = "", method="POST", data) => {
  if (method === "PUT")
    url = `${url}/${data["slug"]}`
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("DATA: ", data);
  if (response.status === 200) {
    console.log(response);
    return response.json();
  }
};  

// interface Ios{
//   primary: String;
//   fallback: String;
// }
// interface Android{
//   primary: String;
//   fallback: String;
// }
// interface URL{
//   slug: String;
//   web: String;
//   ios: Ios;
//   android: Android;
// }


function App() {
  const [slug, setSlug] = useState("");
  const [iosPrimary, setIosPrimary] = useState("");
  const [iosFallback, setIosFallback] = useState("");
  const [andriodPrimary, setAndriodPrimary] = useState("");
  const [andriodFallback, setAndriodFallback] = useState("");
  const [web, setWeb] = useState("");
  const [urls, setUrls] = useState([]);
  const [httpMethod, setHTTPMethod] = useState("post");
  const baseURL = "https://secure-oasis-88951.herokuapp.com";
  const localURL = "http://localhost:5000/shortlinks";

  const handleSend = async (e) => {
    console.log(httpMethod)
    e.preventDefault();
    let ios = {
      primary: iosPrimary,
      fallback: iosFallback
    }
    let android = {
      primary: andriodPrimary,
      fallback: andriodFallback
    }

    let urlBody = {
      slug: slug,
      web: web,
      ios:ios,
      android:android
    }

    ios = clean(ios)
    android = clean(android)
    urlBody = clean(urlBody)

    await postMessage(localURL, httpMethod, urlBody);
  };  

  const handleGet = async (e) => {
    e.preventDefault();
    await fetch(`${localURL}`)
    .then((res) => {
        return res.json();
      })
    .then((res) => {
      setUrls(res)
      console.log("URLS", urls)
    });
  };

  return (
    <div className="App">
      <h2>Welcome to Hatchways</h2>
      <form onSubmit={handleGet}>
      <table class="row justify-content-center">
        <tbody>
          <tr>
          </tr>
          <button>Fetch urls</button>
        </tbody>
      </table>
            </form>

      <form onSubmit={handleSend}>
      <table class="row justify-content-center">
        <tbody>
          <tr>
          <td class="align-baseline">
              <div class="form-group">
                <label for="slug" class="control-label">
                  Slug
                </label>
                <input
                  class="form-control"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  id="slug"
                />
              </div>
            </td>
            <td class="align-baseline">
              <div class="form-group">
                <label for="ios_prime" class="control-label">
                  IOS Primary
                </label>
                <input
                  class="form-control"
                  value={iosPrimary}
                  onChange={(e) => {
                    setIosPrimary(e.target.value);
                  }}
                  id="ios_prime"
                />
              </div>
            </td>
            <td class="align-baseline">
              <div class="form-group">
                <label for="ios_fall" class="control-label">
                IOS fallback
                </label>
                <input
                  class="form-control"
                  value={iosFallback}
                  onChange={(e) => {
                    setIosFallback(e.target.value);
                  }}
                  id="ios_fall"
                />
              </div>
            </td>
            <td class="align-baseline">
              <div class="form-group">
                <label for="and_prime" class="control-label">
                Android Primary
                </label>
                <input
                  class="form-control"
                  value={andriodPrimary}
                  onChange={(e) => {
                    setAndriodPrimary(e.target.value);
                  }}
                  id="and_prime"
                />
              </div>
            </td>
            <td class="align-baseline">
              <div class="form-group">
                <label for="and_fall" class="control-label">
                Android fallback
                </label>
                <input
                  class="form-control"
                  value={andriodFallback}
                  onChange={(e) => {
                    setAndriodFallback(e.target.value);
                  }}
                  id="and_fall"
                />
              </div>
            </td>
            <td class="align-baseline">
              <div class="form-group">
                <label for="slug" class="control-label">
                  Web
                </label>
                <input
                  class="form-control"
                  value={web}
                  onChange={(e) => {
                    setWeb(e.target.value);
                  }}
                  id="slug"
                />
              </div>
            </td>
          </tr>
                  <tr>
                  <td class="align-baseline">
                                <div class="form-group">
                                  <label for="direction" class="control-label">
                                    Method
                                  </label>
                                  <select
                                    id="direction"
                                    className="form-control"
                                    onChange={(e) => {
                                      setHTTPMethod(e.target.value);
                                    }}
                                  >
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                  </select>
                                  </div>
                              </td>
                  </tr>
          <button>Submit</button>
        </tbody>
      </table>
      </form>

      {urls.map((url, index)=>{
        return(
          <div>
            Slug: {url.slug}<br/>
            IOS: {url.ios.primary}, {url.ios.fallback}<br/>
            Android: {url.android.primary}, {url.android.fallback}<br/>
            Web: {url.web}<br/><br/><br/>
          </div>
        )
        })
        }
    </div>
  );
}
export default App;



