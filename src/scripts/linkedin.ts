import Profile from "../models/Profile";

async function getProfileInfos(): Promise<Profile> {
  const fullName = document.querySelectorAll('.pv-top-card--list li')[0];
  const title = document.querySelectorAll('.pv-top-card h2.mt1')[0];
  const image = document.querySelectorAll('.profile-photo-edit img')[0]
  return {
    fullName: fullName.textContent.replace(/\n/, "").trim(),
    title: title.textContent.replace(/\n/, "").trim(),
    country: "XXX",
    imageSrc: image.getAttribute('src')
  };
}

let profile: Profile = null;
setTimeout(() => {
  getProfileInfos().then(result => {
    profile = result || profile;
  })
}, 3000)

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getFullName") {
    response(profile)
  }
  return true;
});
