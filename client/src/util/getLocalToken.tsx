

export const getLocalToken = ():TokenType => {
    const token = localStorage.getItem("spotifyAuthToken");
    return token;
}

export type TokenType = string | null;