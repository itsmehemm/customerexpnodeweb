export const getAPIHeaders = () => {
    let apiHeaders = new Headers();
    apiHeaders.append("X-TINNAT-SECURITY-CONTEXT", "{\"clientId\": \"tinnat_web\", \"key\": \"tinnat_guest_secret\"}");
    apiHeaders.append("Content-Type", "application/json");
    return apiHeaders;
};

export const getDefaultAPIHeaders = () => {
    let apiHeaders = new Headers();
    apiHeaders.append("Content-Type", "application/json");
    return apiHeaders;
};
