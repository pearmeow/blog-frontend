function isAuthorized() {
    return localStorage.getItem("token");
}

export default isAuthorized;
