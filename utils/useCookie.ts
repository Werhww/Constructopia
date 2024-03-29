export function setCookie(cname:string, cvalue:string, exdays:number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname:string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getUId() {
  return getCookie('uid')
}

export function checkUIDCookie() {
  let uid = getCookie("uid");
  if(uid != '') return uid
  
  /* Endre til også å sjekke om person e logget inn */
  uid = crypto.randomUUID()
  setCookie('uid', uid, 400)
  return uid
}