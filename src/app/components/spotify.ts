import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const responseBody = await response.text();

  return JSON.parse(responseBody);
};

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error fetching now playing data:", response.statusText);
      return null;
    }

    const responseBody = await response.text();

    if (!responseBody.trim()) {
      console.error("Empty response from Spotify API");
      return null;
    }

    const parsedResponse = JSON.parse(responseBody);

    if (!parsedResponse || !parsedResponse.is_playing) {
      console.error("No song currently playing");
      return null;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error fetching now playing data:", error);
    return null;
  }
};

export default async function NowPlaying() {
  const song = await getNowPlaying();

  if (!song) {
    return {
      isPlaying: false,
      title: "Not Listening",
      artist: "Spotify",
      album: "",
      albumImageUrl: "https://spotify.com",
      songUrl: "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj",
    };
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: { name: any }) => _artist.name)
    .join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0]?.url ?? "https://spotify.com";
  const songUrl = song.item.external_urls.spotify;

  return {
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  };
}
